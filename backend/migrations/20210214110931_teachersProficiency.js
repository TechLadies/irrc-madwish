exports.up = function(knex, Promise) {
    return knex.schema.raw(`
      ALTER TABLE "teachers" DROP CONSTRAINT "teachers_LanguageProficiency_check";
      ALTER TABLE "teachers" ADD CONSTRAINT "teachers_LanguageProficiency_check" 
      CHECK ("LanguageProficiency" IN ('Little', 'Simple', 'Intermediate', 'Fluent'));
      ALTER TABLE "teachers" DROP CONSTRAINT "teachers_EnglishProficiency_check";
      ALTER TABLE "teachers" ADD CONSTRAINT "teachers_EnglishProficiency_check" 
      CHECK ("EnglishProficiency" IN ('Little', 'Simple', 'Intermediate', 'Fluent'))
    `);
  };

  exports.down = async function(knex) {
    return knex.raw(`
        ALTER TABLE "teachers" DROP CONSTRAINT "teachers_LanguageProficiency_check";
        ALTER TABLE "teachers" DROP CONSTRAINT "teachers_EnglishProficiency_check";
    `);
  };
