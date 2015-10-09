'use strict'

let stream  = require('stream')
  , util    = require('util')

module.exports = function () {
  stream.Transform.call(this, { objectMode: true })

  let received = [ ]

  this._transform = (arr, enc, cb) => {
    received = received.concat(arr)
    cb()
  }

  this._flush = cb => {
    received.forEach(i => this.push(i))
    cb()
  }
}

util.inherits(module.exports, stream.Transform)
