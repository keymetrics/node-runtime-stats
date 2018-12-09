/* eslint-env mocha */

const RuntimeStats = require('../lib/index.js')

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
      if (obj === undefined || obj.gc === undefined || obj.ticks) {
        throw new Error('Object received is undefined')
      }
      done()
    })
  })

  it('should stop', () => {
    rstats.stop()
  })
})
