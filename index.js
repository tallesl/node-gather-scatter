'use strict'

const stream = require('stream')
const util = require('util')

exports.Gather = function () {
  stream.Transform.call(this, { objectMode: true })

  const gathered = [ ]

  this._transform = (obj, enc, cb) => {
    gathered.push(obj)
    cb()
  }

  this._flush = cb => {
    this.push(gathered)
    cb()
  }
}

exports.Scatter = function () {
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

util.inherits(exports.Gather, stream.Transform)
util.inherits(exports.Scatter, stream.Transform)
