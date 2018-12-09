'use strict'

const EventEmitter = require('events')
const nativeStats = require('../build/Release/node-runtime-stats.node')

class RuntimeStats extends EventEmitter {
  constructor (config) {
    super()
    this.senseDelay = config.delay || 1000
  }

  start () {
    nativeStats.start()
    this.senseInterval = setInterval(this.senseNow.bind(this), this.senseDelay)
  }

  stop () {
    nativeStats.stop()
    clearInterval(this.senseInterval)
  }

  senseNow () {
    let { ticks, gcCount, gcTime, oldGcCount, oldGcTime, youngGcCount, youngGcTime } = nativeStats.sense()

    this.emit('sense', {
      gc: {
        collections: gcCount,
        pause: gcTime,
        oldCollections: oldGcCount,
        oldPause: oldGcTime,
        youngCollections: youngGcCount,
        youngPause: youngGcTime
      },
      ticks: ticks
    })
  }
}

module.exports = RuntimeStats
