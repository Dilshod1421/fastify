const boom = require('boom');
const { v4 } = require('uuid');
const { read_file, write_file } = require('../modules/fs');

const getCars = async (req, reply) => {
    try {
        let cars = read_file("cars.json");
        reply.code(200).send(cars);
    } catch (err) {
        throw boom.boomify(err);
    }
};

const getCarById = async (req, reply) => {
    try {
        const car = read_file("cars.json").find(car => car.id == req.params.id);
        if (!car) reply.code(404).send('Not found!');
        reply.code(200).send(car);
    } catch (error) {
        throw boom.boomify(error);
    }
};

const addCar = async (req, reply) => {
    try {
        const cars = read_file("cars.json");
        cars.push({ id: v4(), ...req.body });
        write_file("cars.json", cars);
        reply.code(201).send(cars[cars.length - 1]);
    } catch (error) {
        throw boom.boomify(error);
    }
};

const updateCar = async (req, reply) => {
    try {
        const cars = read_file("cars.json");
        const { brand, model, price } = req.body;
        const id = req.params.id;
        const car = cars.find(car => car.id == id);
        if (!car) reply.code(404).send('Not found!');
        cars.forEach((car) => {
            if (car.id === id) {
                car.brand = brand || car.brand
                car.model = model || car.model
                car.price = price || car.price
            };
        })
        write_file("cars.json", cars);
        reply.code(200).send(cars.find(car => car.id === id));
    } catch (error) {
        throw boom.boomify(error);
    }
};

const deleteCar = async (req, reply) => {
    try {
        const id = req.params.id;
        const cars = read_file("cars.json");
        cars.forEach((car, idx) => {
            if (car.id == id) {
                cars.splice(idx, 1);
            }
        })
        write_file("cars.json", cars);
        reply.code(200).send(cars);
    } catch (err) {
        throw boom.boomify(err);
    }
};

module.exports = { getCars, getCarById, addCar, updateCar, deleteCar };