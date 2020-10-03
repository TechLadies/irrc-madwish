const { Model } = require('objection')
const tableName = 'students'

class Student extends Model {
  static get tableName () {
    return tableName
  }

  fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['PhoneNumber', 'FirstName', 'LastName', 'StatusID'],
      properties: {
        id: { type: 'integer' },
        PhoneNumber: { type: 'string', minLength: 1, maxLength: 255 }, // ToDo review datatype - string or int?
        FirstName: { type: 'string', maxLength: 255 },
        LastName: { type: 'string', maxLength: 255 },
        Source: { type: 'string', maxLength: 500 },
        NativeLanguage: { type: 'string', maxLength: 255 },
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
  tableName
}
