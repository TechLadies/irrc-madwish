const { Model } = require('objection')
const tableStudents = 'students'

class Student extends Model {
  static get tableName () {
    return tableStudents
  }

  static get idColumn () {
    return ['StudentID']
  }

  fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  static get relationMappings () {
    const NativeLanguage = require('./nativeLanguage')
    const Status = require('./status')
    const StatusUpdate = require('./statusUpdate')

    return {
      nativeLanguage: {
        relation: Model.BelongsToOneRelation,
        modelClass: NativeLanguage,
        join: {
          from: 'students.NativeLanguageID',
          to: 'nativeLanguages.NativeLanguageID'
        }
      },

      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'students.StatusID',
          to: 'statuses.StatusID'
        }
      },

      statusUpdates: {
        relation: Model.HasManyRelation,
        modelClass: StatusUpdate,
        join: {
          from: 'students.StudentID',
          to: 'statusUpdates.StudentID'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['PhoneNumber', 'FirstName', 'LastName', 'StatusID'],
      properties: {
        StudentID: { type: 'integer' },
        PhoneNumber: { type: 'string', minLength: 1, maxLength: 255 }, // ToDo review datatype - string or int?
        FirstName: { type: 'string', maxLength: 255 },
        LastName: { type: 'string', maxLength: 255 },
        Source: { type: 'string', maxLength: 500 },
        NativeLanguageID: { type: 'integer' },
        EnglishProficiency: { type: 'string' },
        Notes: { type: 'string', maxLength: 500 },
        StatusID: { type: 'integer' }
      }
    }
  }
}

module.exports = {
  Student,
  model: Student,
  tableStudents
}
