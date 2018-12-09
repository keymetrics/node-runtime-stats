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
    const data = nativeStats.sense()

    this.emit('sense', {
      gc: {
        collections:  data.gcCount,
        pause:  data.gcTime,
        oldCollections:  data.oldGcCount,
        oldPause:  data.oldGcTime,
        youngCollections:  data.youngGcCount,
        youngPause:  data.youngGcTime
      },
      ticks: data.ticks
    })
  }
}

module.exports = RuntimeStats
