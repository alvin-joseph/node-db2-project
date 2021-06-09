const Car = require('./cars-model')
const vin = require('vin-validator')

const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
    .then(car => {
      if (!car) {
        next({
          message: `car with id ${req.params.id} is not found`,
          status: 404
        })
      } else {
        req.car = car
        next()
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const error = { status: 400 }
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    error.message = "vin is missing"
  } else if (!make) {
    error.message = "make is missing"
  } else if (!model) {
    error.message = "model is missing"
  } else if (!mileage) {
    error.message = "mileage is missing"
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (vin.validate((req.body.vin).trim())) {
    next()
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  try {
    const existing = await Car.getByVin(vin.trim())
    if (existing) {
      next({
        status: 400,
        message: `vin ${vin.trim()} already exists`
      })
    } else {
      req.vin = vin.trim()
      req.make = make.trim()
      req.model = model.trim()
      req.mileage = mileage
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}