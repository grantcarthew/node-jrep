require('console-probe').apply()
const { table } = require('table')
const chalk = require('chalk')
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()
const data = require('../data')

const line = '='.repeat(80)
console.log(line)
console.log(' Type of benchmark')
console.log(line)

suite.add('typeof', typeofTest)
suite.add('toString', toStringTest)

function typeofTest () {
  return typeof 'hello world' === 'string'
}

function toStringTest () {
  return Object.prototype.toString.call('hello world') === '[object String]'
}

suite.on('cycle', function (event) {
  console.log(String(event.target))
})

suite.on('complete', function () {
  const result = table([
    [chalk.blue('Benchmark Ops/Sec'),
      chalk.green(this[0].name),
      chalk.yellow(this[1].name),
      chalk.blue('Percent')],
    row('Result', this[0], this[1])
  ])
  console.log(result)
  console.log(line)
})

suite.run({ 'async': true })

function row (name, n, m) {
  let n2 = Number(n.hz).toFixed(2)
  let m2 = Number(m.hz).toFixed(2)
  let result = ''
  let pc = 0

  if (n.hz >= m.hz) {
    pc = Number(100 - (m.hz / n.hz * 100)).toFixed(2)
    result = chalk.green(`${n.name} faster by ${pc}%`)
  } else {
    pc = Number(100 - (n.hz / m.hz * 100)).toFixed(2)
    result = chalk.yellow(`${m.name} faster by ${pc}%`)
  }
  return [chalk.blue(name), n2, m2, result]
}
