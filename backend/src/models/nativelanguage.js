const { Model } = require('objection')
const tableNativelanguages = 'nativelanguages'

class NativeLanguage extends Model {
  static get tableName () {
    return tableNativelanguages
  }

  static get idColumn () {
    return ['NativeLanguageID']
  }

  static get relationMappings () {
    const Student = require('./student')

    return {
      nativelanguage: {
        relation: Model.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'nativelanguages.NativeLanguageID',
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
  tableNativelanguages
}
