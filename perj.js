const symSplitOptions = Symbol('SplitOptions')
const symOptions = Symbol('Options')
const symTopString = Symbol('TopString')
const symTopObject = Symbol('TopObject')
const symHeaders = Symbol('Headers')
const symHeaderStrings = Symbol('Headers')
const symHeaderObjects = Symbol('Headers')
const symAddLogHeader = Symbol('AddLogHeader')
const symAddLogFunction = Symbol('AddLogFunction')
const dateTimeFunctions = Object.freeze({
  epoch () { return Date.now() },
  unix () { return Math.round(Date.now() / 1000.0) },
  iso () { return '"' + (new Date()).toISOString() + '"' }
})
require('console-probe').apply()
const defaultOptions = {
  levels: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  level: 'info',
  levelKey: 'level',
  levelNumberKey: 'lvl',
  dateTimeKey: 'time',
  dateTimeFunction: dateTimeFunctions.epoch,
  messageKey: 'msg',
  dataKey: 'data',
  passThrough: false,
  write: defaultWriter()
}

function defaultWriter () {
  const isNode = Object.prototype.toString.call(process) === '[object process]'
  return isNode ? process.stdout.write.bind(process.stdout) : console.log
}

module.exports = Object.freeze({
  create (obj) {
    return new Perj(obj)
  },
  dateTimeFunctions
})

class Perj {
  constructor (options) {
    this[symOptions] = Object.assign({}, defaultOptions)
    this[symTopString] = ''
    this[symTopObject] = {}
    this[symSplitOptions](options)
    this[symHeaders] = {}
    this[symHeaderStrings] = {}
    this[symHeaderObjects] = {}
    for (const level in this[symOptions].levels) {
      this[symAddLogHeader](level)
      this[symAddLogFunction](level)
    }
  }

  get level () {
    return this[symOptions].level
  }

  set level (level) {
    if (!(this[symOptions].levels.hasOwnProperty(level))) {
      throw new Error('The level option must be a valid key in the levels object.')
    }
    this[symOptions].level = level
  }

  get levels () {
    return this[symOptions].levels
  }

  addLevel (newLevels) {
    for (const level in newLevels) {
      if (this[level]) { continue }
      this[symOptions].levels[level] = newLevels[level]
      this[symAddLogHeader](level)
      this[symAddLogFunction](level)
    }
  }

  get write () {
    return this[symOptions].write
  }

  [symSplitOptions] (options) {
    if (!options) { return }
    for (const key in options) {
      if (defaultOptions.hasOwnProperty(key)) {
        if (key === 'level') {
          this.level = options[key]
          continue
        }
        this[symOptions][key] = options[key]
      } else {
        this[symTopString] += ',"' + key + '":' + stringifyTopValue(options[key])
        if (this[symOptions].passThrough) {
          this[symTopObject][key] = options[key]
        }
      }
    }
  }

  [symAddLogHeader] (level) {
    this[symHeaderStrings][level] = '{"' +
      this[symOptions].levelKey + '":"' + level + '","' +
      this[symOptions].levelNumberKey + '":' + this[symOptions].levels[level] +
      this[symTopString] + ',"' +
      this[symOptions].dateTimeKey + '":'
    if (this[symOptions].passThrough) {
      this[symHeaderObjects][level] = Object.assign({
        [this[symOptions].levelKey]: level,
        [this[symOptions].levelNumberKey]: this[symOptions].levels[level]
      }, this[symTopObject])
    }
  }

  [symAddLogFunction] (level) {
    this[level] = function (...items) {
      if (this[symOptions].levels[this[symOptions].level] >
        this[symOptions].levels[level]) {
        return
      }
      const time = this[symOptions].dateTimeFunction()
      const splitItems = stringifyLogItems(items)
      const json = this[symHeaderStrings][level] + time +
          ',"' + this[symOptions].messageKey + '":"' + splitItems.msg +
          '","' + this[symOptions].dataKey + '":' + splitItems.dataStr + '}\n'
      if (this[symOptions].passThrough) {
        const obj = Object.assign(this[symHeaderObjects][level], {
          [this[symOptions].dateTimeKey]: time,
          [this[symOptions].messageKey]: splitItems.msg,
          [this[symOptions].dataKey]: splitItems.data
        })
        this[symOptions].write(json, obj)
      } else {
        this[symOptions].write(json)
      }
    }
  }

  child (tops) {
    if (!tops) {
      throw new Error('Provide top level arguments to create a child logger.')
    }
    const newChild = Object.create(this)
    for (const key in tops) {
      if (!defaultOptions.hasOwnProperty(key)) {
        newChild[symTopString] += ',"' + key + '":' + stringifyTopValue(tops[key])
        if (this[symOptions].passThrough) {
          newChild[symTopObject][key] = tops[key]
        }
      }
    }
    newChild.parent = this
    newChild[symOptions] = Object.assign({}, this[symOptions])
    newChild[symHeaderStrings] = Object.assign({}, this[symHeaderStrings])
    if (this[symOptions].passThrough) {
      newChild[symHeaderObjects] = Object.assign({}, this[symHeaderObjects])
    }
    for (const level in this[symOptions].levels) {
      newChild[symAddLogHeader](level)
    }
    return newChild
  }

  stringify (obj, replacer, spacer) {
    return stringify(obj, replacer, spacer)
  }

  json (data) {
    console.log(stringify(data, null, 2))
  }
}

function stringifyLogItems (items) {
  let result = { msg: '', data: [], dataStr: '' }

  for (const item of items) {
    if (Object.prototype.toString.call(item) === '[object String]') {
      if (result.msg) {
        result.data.push(item)
      } else {
        result.msg = item
      }
      continue
    }
    if (item instanceof Error) {
      result.data.push(serializerr(item))
      if (!result.msg) { result.msg = item.message }
      continue
    }
    result.data.push(item)
  }

  if (result.data.length < 1) {
    result.data = ''
  } else if (result.data.length === 1) {
    result.data = result.data[0]
  }

  result.dataStr = stringify(result.data)
  return result
}

function stringifyTopValue (value) {
  let str = stringify(value)
  return str === undefined ? '""' : str
}

// =================================================================
// Following code is from the fast-safe-stringify package.
// =================================================================

const arr = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  const res = JSON.stringify(obj, replacer, spacer)
  while (arr.length !== 0) {
    const part = arr.pop()
    part[0][part[1]] = part[2]
  }
  return res
}
function decirc (val, k, stack, parent) {
  let i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        parent[k] = '[Circular]'
        arr.push([parent, k, val])
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      const keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        const key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// =================================================================
// Following code is from the serializerr package.
// =================================================================

function serializerr (obj = {}) {
  const chain = protochain(obj)
    .filter(obj => obj !== Object.prototype)
  return [obj]
    .concat(chain)
    .map(item => Object.getOwnPropertyNames(item))
    .reduce((result, names) => {
      names.forEach(name => {
        result[name] = obj[name]
      })
      return result
    }, {})
}

// =================================================================
// Following code is from the protochain package.
// =================================================================

function protochain (obj) {
  const chain = []
  let target = getPrototypeOf(obj)
  while (target) {
    chain.push(target)
    target = getPrototypeOf(target)
  }

  return chain
}

function getPrototypeOf (obj) {
  if (obj == null) return null
  return Object.getPrototypeOf(Object(obj))
}
