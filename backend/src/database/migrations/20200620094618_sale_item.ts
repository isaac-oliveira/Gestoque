import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('sale_item', (table) => {
    table.integer('id').primary();
    table.integer('id_product').unsigned().notNullable();
    table.integer('id_sale').unsigned().notNullable();
    table.integer('amount').notNullable();

    table
      .foreign('id_product')
      .references('id')
      .inTable('product')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('id_sale')
      .references('id')
      .inTable('sale')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('sale_item');
}
