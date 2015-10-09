'use strict'

let assert    = require('assert')
  , Gather    = require('./gather')
  , Scatter   = require('./scatter')
  , streamify = require('stream-array')

it('gather', done => {
  let expected = [ 1, 2, 3 ]
    , produce  = streamify(expected)
    , gather   = new Gather

  gather.on('data', actual => assert.deepEqual(actual, expected))
  gather.on('error', assert.ifError)
  gather.on('end', done)

  produce.pipe(gather)
})

it('scatter', done => {
  let expected = [ 1, 2, 3 ]
    , produce  = streamify([ expected ])
    , scatter  = new Scatter
    , actual   = [ ]

  scatter.on('data', data => actual.push(data))
  scatter.on('error', assert.ifError)
  scatter.on('end', () => {
    assert.deepEqual(actual, expected)
    done()
  })

  produce.pipe(scatter)
})
