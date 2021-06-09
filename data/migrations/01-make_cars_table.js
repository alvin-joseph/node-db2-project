exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
      table.increments()
      table.string('vin', 17).unique().notNullable() 
      table.string('make', 128).notNullable() 
      table.string('model', 128).notNullable()
      table.integer('mileage').unsigned().notNullable() //can't be negative
      table.string('title', 128)
      table.string('transmission', 128)
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
  }
