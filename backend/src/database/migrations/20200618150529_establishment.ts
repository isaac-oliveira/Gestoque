import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('establishment', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('establishment');
}
