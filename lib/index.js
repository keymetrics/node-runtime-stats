'use strict'

const EventEmitter = require('events')
const nativeStats = require('../build/Release/node-runtime-stats.node')

let initiated = false

class RuntimeStats extends EventEmitter {
  constructor (config) {
    super()
    this.senseDelay = config.delay || 1000
  }

  start () {
    if (initiated === true) {
      console.error('starting runtime stats twice without stopping the old one')
      console.trace()
      return
    }
    initiated = true
    nativeStats.start()
    this.senseInterval = setInterval(this.senseNow.bind(this), this.senseDelay)
    // allow the event loop to stop even with the interval in place
    this.senseInterval.unref()
  }

  stop () {
    nativeStats.stop()
    clearInterval(this.senseInterval)
    initiated = false
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
      usage: data.usage,
      ticks: data.ticks
    })
  }
}

module.exports = RuntimeStats
