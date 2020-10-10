const { Model } = require('objection')
const tableStatusUpdates = 'statusUpdates'

class StatusUpdate extends Model {
  static get tableName () {
    return tableStatusUpdates
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
          from: 'statusUpdates.StudentID',
          to: 'students.StudentID'
        }
      },

      previousstatusID: {
        relation: Model.ManytoManyRelation,
        modelClass: Status,
        join: {
          from: 'statusUpdates.PreviousStatusID',
          to: 'statuses.StatusID'
        }
      },

      nextstatusID: {
        relation: Model.ManytoManyRelation,
        modelClass: Status,
        join: {
          from: 'statusUpdates.NextStatusID',
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
  StatusUpdate,
  model: StatusUpdate,
  tableStatusUpdates
}
