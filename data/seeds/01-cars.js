exports.seed = function(knex) {
    return knex('cars').truncate()
      .then(function () {
        return knex('cars').insert([
          { vin: '2T1BR30E46C595221', make: 'Toyota', model: 'Corolla', mileage: 50000, title: 'clean', transmission: 'automatic' },
          { vin: '1FUPDXYB3PP469921', make: 'Freightliner', model: 'Conventional', mileage: 500000, title: 'clean', transmission: 'automatic' },
          { vin: 'JTHBB1BA2A2013500', make: 'Lexus', model: 'Various', mileage: 20000, transmission: 'manual' },
          { vin: 'JH4KA3270KC007497', make: 'Acura', model: 'Legend', mileage: 90000, title: "clean" },
        ]);
      });
  };
