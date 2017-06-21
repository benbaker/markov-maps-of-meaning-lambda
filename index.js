'use strict'
const defaults = require('lodash/defaults')
const fs = require('fs')
const path = require('path')
const markov = require('markov')
const m = markov(2)
const s = fs.createReadStream(path.resolve('mapsofmeaning.txt'))
var LOADED = false
m.seed(s, () => {
  LOADED = true
})
const getParams = (event) => {
  if (event.input) { return event }
  let body = JSON.parse(event.body || '{}')
  return defaults(body, event.pathParameters, event.queryStringParameters)
}
const getResponse = (ops, cb) => {
    let response = m.respond(ops.input).join(' ')
    cb(null, {response:response})
}
const doSearch = (ops, cb) => {
  let intervalId = setInterval(() => {
    if (LOADED) {
      clearInterval(intervalId)
      getResponse(ops, cb)
    }
  }, 30)
}
exports.handler = (event, context, callback) => {
  const done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "https://www.benspodcast.net"}
  })
  doSearch(getParams(event), done)
}
