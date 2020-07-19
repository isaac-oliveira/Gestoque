import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('sale', (table) => {
    table.integer('id').primary();
    table.integer('id_establishment').unsigned().notNullable();
    table.integer('id_client').unsigned();
    table.date('date').notNullable();

    table
      .foreign('id_establishment')
      .references('id')
      .inTable('establishment')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('id_client')
      .references('id')
      .inTable('client')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('sale');
}
