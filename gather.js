'use strict'

let stream  = require('stream')
  , util    = require('util')

module.exports = function () {
  stream.Transform.call(this, { objectMode: true })

  let gathered = [ ]

  this._transform = (obj, enc, cb) => {
    gathered.push(obj)
    cb()
  }

  this._flush = cb => {
    this.push(gathered)
    cb()
  }
}

util.inherits(module.exports, stream.Transform)
