const { Model } = require('objection')
const tableReasons = 'reasons'

class Reason extends Model {
  static get tableName () {
    return tableReasons
  }

  static get idColumn () {
    return ['ReasonID']
  }

  static get relationMappings () {
    const StatusUpdate = require('./statusUpdate')

    return {
      statusUpdates: {
        relation: Model.HasManyRelation,
        modelClass: StatusUpdate.model,
        join: {
          from: 'reasons.ReasonID',
          to: 'statusUpdates.ReasonID'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['Reason'],
      properties: {
        ReasonID: { type: 'integer' },
        Reason: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = {
  Reason,
  model: Reason,
  tableReasons
}
