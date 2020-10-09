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
    const Nativelanguage = require('./nativelanguage')
    const Status = require('./status')
    const Statusupdate = require('./statusupdate')

    return {
      nativelanguage: {
        relation: Model.HasOneRelation,
        modelClass: Nativelanguage,
        join: {
          from: 'students.NativeLanguageID',
          to: 'nativelanguages.NativeLanguageID'
        }
      },

      statusID: {
        relation: Model.HasOneRelation,
        modelClass: Status,
        join: {
          from: 'students.StatusID',
          to: 'statuses.StatusID'
        }
      },

      statusupdateID: {
        relation: Model.HasManyRelation,
        modelClass: Statusupdate,
        join: {
          from: 'students.StudentID',
          to: 'statusupdates.StudentID'
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
