import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('client', (table) => {
    table.integer('id').primary();
    table.integer('id_establishment').unsigned().notNullable();
    table.string('name').notNullable().unique();
    table.decimal('debt_value').notNullable();

    table
      .foreign('id_establishment')
      .references('id')
      .inTable('establishment')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('client');
}
