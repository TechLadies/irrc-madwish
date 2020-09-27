
'use strict'

const fs = require('fs')
const path = require('path')
const Knex = require('knex')
const knexConfig = require('../../knexfile')
const { Model } = require('objection')

const basename = path.basename(__filename)
const db = {}

// Initialise Knex
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
db.knex = knex

Model.knex(knex)

// Make models accessible on the single "db" export
fs.readdirSync(__dirname).filter((file) => {
  return (
    !_isDotFile(file) && !_isCurrentFile(file) && _fileHasExtension(file, '.js')
  )
}).forEach(file => {
  const model = require(path.join(__dirname, file)).model
  db[model.name] = model
})

module.exports = db

// Helpers
function _isDotFile (fileName) {
  return fileName.indexOf('.') === 0
}
function _isCurrentFile (fileName) {
  return fileName === basename
}
function _fileHasExtension (fileName, ext) {
  if (!ext.startsWith('.')) ext = `.${ext}`
  return fileName.slice(-ext.length) === ext
}
