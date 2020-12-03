import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('appointments', table => {
        table.increments('id').primary();        
        table.dateTime("scheduling_at").notNullable();

        table.integer('fornecedor_id')
        .notNullable()
        .references('id')
        .inTable('fornecedores');

        table.integer('comprador_id')
        .notNullable()
        .references('id')
        .inTable('compradores');
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('appointments');
}