import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('product', (table) => {
    table.integer('id').primary();
    table.integer('id_establishment').unsigned().notNullable();
    table.string('name').notNullable().unique();
    table.string('type').notNullable();
    table.decimal('purchase_value').notNullable();
    table.decimal('sale_value').notNullable();
    table.integer('amount').notNullable();

    table
      .foreign('id_establishment')
      .references('id')
      .inTable('establishment')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('product');
}
