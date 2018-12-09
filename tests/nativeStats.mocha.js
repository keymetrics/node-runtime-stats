/* eslint-env mocha */
'use strict'

const RuntimeStats = require('../lib/index.js')
const assert = require('assert')

describe('nativeStats', _ => {
  let rstats = null

  it('should construct', () => {
    rstats = new RuntimeStats({
      delay: 1000
    })
  })

  it('should start', () => {
    rstats.start()
  })

  it('should emit an object', done => {
    rstats.once('sense', obj => {
      // do not remove, its to see the output with the CI
      console.log(obj)
      assert(obj !== undefined, 'should have received object')
      assert(typeof obj.gc === 'object', 'should have received gc metrics')
      assert(Array.isArray(obj.ticks), 'should have given the lasts ticks durations')
      done()
    })
  })

  it('should stop', () => {
    rstats.stop()
  })
})
