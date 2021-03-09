exports.up = async function(knex) {
    if (!await knex.schema.hasTable("users")) {
        await knex.schema
            .createTable('users', function (table) {
                table.increments('id').primary();
                table.string("username", 100);
                table.string("psswd", 100);
        })
    }
    if (!await knex.schema.hasTable("lists")) {
        await knex.schema
            .createTable('lists', function (table) {
                table.increments('id').primary();
                table.string("listname", 100);
                table.integer("userid").references("id").inTable("users").onDelete('CASCADE').notNullable();
        })
    }
    if (!await knex.schema.hasTable("items")) {
        await knex.schema
            .createTable('items', function (table) {
                table.increments('id').primary();
                table.string("itemname", 100);
                table.integer("listid").references("id").inTable("lists").onDelete('CASCADE').notNullable();
                table.string("status", 100); //todo task is ongoing or completed
        })
    }
  };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTable("items")
        .dropTable("lists")
        .dropTable("users");
  };