const { Model } = require('objection')
const tableName = 'status'

class Status extends Model {
  static get tableName () {
    return tableName
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['Description'],
      properties: {
        id: { type: 'integer' },
        Description: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }
}

module.exports = {
  Status,
  model: Status,
  tableName
}
