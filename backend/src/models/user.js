const { Model } = require("objection");
const bcrypt = require("bcrypt");
const tableUsers = "users";

class User extends Model {
  static get tableName() {
    return tableUsers;
  }

  static get idColumn() {
    return ["UserID"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["Username", "Password"],
      properties: {
        UserID: { type: "integer" },
        Username: { type: "string", minLength: 1, maxLength: 255 },
        Password: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  async $beforeInsert(args) {
    await super.$beforeInsert(args);
    const hashed = await bcrypt.hash(this.Password, 10);
    this.Password = hashed;
  }

  async isValidPassword(password) {
    return await bcrypt.compare(password, this.Password);
  }
}

module.exports = {
  User,
  model: User,
  tableUsers,
};
