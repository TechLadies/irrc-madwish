const { Model } = require("objection");
const tableTeachers = "teachers";

class Teacher extends Model {
  static get tableName() {
    return tableTeachers;
  }

  static get idColumn() {
    return ["TeacherID"];
  }

  static get relationMappings() {
    const NativeLanguage = require("./nativeLanguage");
    const Status = require("./status");
    const StatusUpdate = require("./statusUpdate");

    return {
      nativeLanguage: {
        relation: Model.BelongsToOneRelation,
        modelClass: NativeLanguage.model,
        join: {
          from: "teachers.NativeLanguageID",
          to: "nativeLanguages.NativeLanguageID",
        },
      },

      secondLanguage: {
        relation: Model.BelongsToOneRelation,
        modelClass: NativeLanguage.model,
        join: {
          from: "teachers.SecondLanguageID",
          to: "nativeLanguages.NativeLanguageID",
        },
      },

      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status.model,
        join: {
          from: "teachers.StatusID",
          to: "statuses.StatusID",
        },
      },

      statusUpdates: {
        relation: Model.HasManyRelation,
        modelClass: StatusUpdate.model,
        join: {
          from: "teachers.TeacherID",
          to: "statusUpdates.TeacherID",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["PhoneNumber", "FullName", "StatusID", "TeachingExperience"],
      properties: {
        TeacherID: { type: "integer" },
        PhoneNumber: { type: "string", minLength: 1, maxLength: 255 }, // ToDo review datatype - string or int?
        Email: { type: "string", maxLength: 500 },
        FullName: { type: "string", maxLength: 500 },
        Source: { type: "string", maxLength: 500 },
        NativeLanguageID: { type: "integer" },
        SecondLanguageID: { type: "integer" },
        EnglishProficiency: { type: "string" },
        LanguageProficiency: { type: "string" },
        TeachingExperience: { type: "string" },
        Notes: { type: "string", maxLength: 500 },
        StatusID: { type: "integer" },
      },
    };
  }
}

module.exports = {
  Teacher,
  model: Teacher,
  tableTeachers,
};
