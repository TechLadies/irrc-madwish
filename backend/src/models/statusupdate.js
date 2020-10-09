const { Model } = require('objection')
const tableStatusupdates = 'statusupdates'

class Statusupdate extends Model {
  static get tableName () {
    return tableStatusupdates
  }

  static get idColumn () {
    return ['StatusUpdateID']
  }

  static get relationMappings () {
    const Student = require('./student')
    const Status = require('./status')

    return {
      student: {
        relation: Model.HasOneRelation,
        modelClass: Student,
        join: {
          from: 'statusupdates.StudentID',
          to: 'students.StudentID'
        }
      },

      previousstatusID: {
        relation: Model.ManytoManyRelation,
        modelClass: Status,
        join: {
          from: 'statusupdates.PreviousStatusID',
          to: 'statuses.StatusID'
        }
      },

      nextstatusID: {
        relation: Model.ManytoManyRelation,
        modelClass: Status,
        join: {
          from: 'statusupdates.NextStatusID',
          to: 'statuses.StatusID'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['StudentID'],
      properties: {
        StatusUpdateID: { type: 'integer' },
        StudentID: { type: 'integer' },
        PreviousStatusID: { type: 'integer' },
        NextStatusID: { type: 'integer' },
        UpdatedBy: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = {
  Statusupdate,
  model: Statusupdate,
  tableStatusupdates
}
