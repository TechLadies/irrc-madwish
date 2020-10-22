const { Model } = require('objection')
const tableNativeLanguages = 'nativeLanguages'

class NativeLanguage extends Model {
  static get tableName () {
    return tableNativeLanguages
  }

  static get idColumn () {
    return ['NativeLanguageID']
  }

  static get relationMappings () {
    const Student = require('./student')

    return {
      students: {
        relation: Model.HasManyRelation,
        modelClass: Student.model,
        join: {
          from: 'nativeLanguages.NativeLanguageID',
          to: 'students.NativeLanguageID'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['NativeLanguage'],
      properties: {
        NativeLanguageID: { type: 'integer' },
        NativeLanguage: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = {
  NativeLanguage,
  model: NativeLanguage,
  tableNativeLanguages
}
