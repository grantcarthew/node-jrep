const { Perj } = require('../src/perj')
const Tool = require('./tool')
const tool = new Tool()
const data = require('../data')
const write = tool.write.bind(tool)
const passThrough = true

let log = new Perj({ write, passThrough })

beforeEach(() => {
  tool.reset()
})

describe('log argument tests', () => {
  for (const level of Object.keys(log.levels)) {
    log = new Perj({write, level: level})

    test(level + ': empty', () => {
      log[level]()
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.jsonOut.msg).toBe('')
      expect(tool.jsonOut.data).toBe('')
    })
    test(level + ': one message', () => {
      log[level](data.msg[0])
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.jsonOut.msg).toBe(data.msg[0])
      expect(tool.jsonOut.data).toBe('')
    })
    test(level + ': one data', () => {
      log[level](data.tardis)
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.jsonOut.msg).toBe('')
      expect(tool.jsonOut.data).toMatchObject(data.tardis)
      expect(data.tardis).toMatchObject(tool.jsonOut.data)
    })
    test(level + ': two messages', () => {
      log[level](data.msg[0], data.msg[1])
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.getType(tool.jsonOut.msg)).toBe('String')
      expect(tool.jsonOut.msg).toBe(data.msg[0])
      expect(tool.getType(tool.jsonOut.data)).toBe('String')
      expect(tool.jsonOut.data).toBe(data.msg[1])
    })
    test(level + ': two messages one data', () => {
      log[level](data.msg[0], data.msg[1], data.tardis)
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.getType(tool.jsonOut.msg)).toBe('String')
      expect(tool.jsonOut.msg).toBe(data.msg[0])
      expect(tool.getType(tool.jsonOut.data)).toBe('Array')
      expect(tool.jsonOut.data[0]).toBe(data.msg[1])
      expect(tool.jsonOut.data[1]).toMatchObject(data.tardis)
      expect(data.tardis).toMatchObject(tool.jsonOut.data[1])
    })
    test(level + ': two messages two data', () => {
      log[level](data.msg[0], data.msg[1], data.tardis, data.serenity)
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.getType(tool.jsonOut.msg)).toBe('String')
      expect(tool.jsonOut.msg).toBe(data.msg[0])
      expect(tool.getType(tool.jsonOut.data)).toBe('Array')
      expect(tool.jsonOut.data.length).toBe(3)
      expect(tool.jsonOut.data[0]).toBe(data.msg[1])
      expect(tool.jsonOut.data[1]).toMatchObject(data.tardis)
      expect(data.tardis).toMatchObject(tool.jsonOut.data[1])
      expect(tool.jsonOut.data[2]).toMatchObject(data.serenity)
      expect(data.serenity).toMatchObject(tool.jsonOut.data[2])
    })
    test(level + ': two messages two data mixed order', () => {
      log[level](data.tardis, data.msg[1], data.serenity, data.msg[0])
      expect(Object.keys(tool.jsonOut).length).toBe(5)
      expect(tool.getType(tool.jsonOut.time)).toBe('Number')
      expect(tool.jsonOut.level).toBe(level)
      expect(tool.getType(tool.jsonOut.msg)).toBe('String')
      expect(tool.jsonOut.msg).toBe(data.msg[1])
      expect(tool.getType(tool.jsonOut.data)).toBe('Array')
      expect(tool.jsonOut.data.length).toBe(3)
      expect(tool.jsonOut.data[0]).toMatchObject(data.tardis)
      expect(data.tardis).toMatchObject(tool.jsonOut.data[0])
      expect(tool.jsonOut.data[1]).toMatchObject(data.serenity)
      expect(data.serenity).toMatchObject(tool.jsonOut.data[1])
      expect(tool.jsonOut.data[2]).toBe(data.msg[0])
    })
  }
})
