const { Model } = require('objection')
const tableStatuses = 'statuses'

class Status extends Model {
  static get tableName () {
    return tableStatuses
  }

  static get idColumn () {
    return ['StatusID']
  }

  static get relationMappings () {
    const Student = require('./student')

    return {
      students: {
        relation: Model.HasManyRelation,
        modelClass: Student.model,
        join: {
          from: 'statuses.StatusID',
          to: 'students.StatusID'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['Description'],
      properties: {
        StatusID: { type: 'integer' },
        Description: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = {
  Status,
  model: Status,
  tableStatuses
}
