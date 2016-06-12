'use strict'

/* global it */

const assert = require('assert')
const Gather = require('.').Gather
const Scatter = require('.').Scatter
const streamify = require('stream-array')

it('gather', done => {
  const expected = [ 1, 2, 3 ]
  const produce = streamify(expected)
  const gather = new Gather()

  gather.on('data', actual => assert.deepEqual(actual, expected))
  gather.on('error', assert.ifError)
  gather.on('end', done)

  produce.pipe(gather)
})

it('scatter', done => {
  const expected = [ 1, 2, 3 ]
  const produce = streamify([ expected ])
  const scatter = new Scatter()
  const actual = [ ]

  scatter.on('data', data => actual.push(data))
  scatter.on('error', assert.ifError)
  scatter.on('end', () => {
    assert.deepEqual(actual, expected)
    done()
  })

  produce.pipe(scatter)
})
