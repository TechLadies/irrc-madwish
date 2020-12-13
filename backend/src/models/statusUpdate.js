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
    const Reason = require('./reason')

    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student.model,
        join: {
          from: 'statusUpdates.StudentID',
          to: 'students.StudentID'
        }
      },

      previousStatus: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status.model,
        join: {
          from: 'statusUpdates.PreviousStatusID',
          to: 'statuses.StatusID'
        }
      },

      nextStatus: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status.model,
        join: {
          from: 'statusUpdates.NextStatusID',
          to: 'statuses.StatusID'
        }
      },

      reason: {
        relation: Model.BelongsToOneRelation,
        modelClass: Reason.model,
        join: {
          from: 'statusUpdates.ReasonID',
          to: 'reasons.ReasonID'
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
        UpdatedBy: { type: 'string', minLength: 1, maxLength: 255 },
        Reason: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = {
  StatusUpdate,
  model: StatusUpdate,
  tableStatusUpdates
}
