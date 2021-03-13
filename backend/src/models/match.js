const { Model } = require('objection')
const tableMatches = 'matches'

class Match extends Model {
  static get tableName () {
    return tableMatches
  }

  static get idColumn () {
    return ['MatchID']
  }

  static get relationMappings () {
    const Student = require('./student')
    const Teacher = require('./teacher')
    const StatusUpdate = require('./statusUpdate')

    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student.model,
        join: {
          from: 'matches.StudentID',
          to: 'students.StudentID'
        }
      },

      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teacher.model,
        join: {
          from: 'matches.TeacherID',
          to: 'teachers.TeacherID'
        }
      },

      studentStatusUpdate: {
        relation: Model.BelongsToOneRelation,
        modelClass: StatusUpdate.model,
        join: {
          from: 'matches.StudentStatusUpdateID',
          to: 'statusUpdates.StatusUpdateID'
        }
      },

      teacherStatusUpdate: {
        relation: Model.BelongsToOneRelation,
        modelClass: StatusUpdate.model,
        join: {
          from: 'matches.TeacherStatusUpdateID',
          to: 'statusUpdates.StatusUpdateID'
        }
      },
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['StudentID', 'TeacherID'],
      properties: {
        MatchID: { type: 'integer' },
        StudentID: { type: 'integer' },
        TeacherID: { type: 'integer' },
        StudentStatusUpdateID: { type: 'integer' },
        TeacherStatusUpdateID: { type: 'integer' },
        LastEmailDate: { type: 'date-time' },
        MatchStatus: { type: 'string' },
        ConfirmedDate: { type: 'date-time' }
      }
    }
  }
}

module.exports = {
  Match,
  model: Match,
  tableMatches
}
