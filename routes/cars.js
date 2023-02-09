const controller = require('../controllers/cars');

const carsRoutes = [
    {
        method: 'GET',
        url: '/cars',
        handler: controller.getCars
    },
    {
        method: 'GET',
        url: '/car/:id',
        handler: controller.getCarById
    },
    {
        method: 'POST',
        url: '/addCar',
        handler: controller.addCar
    },
    {
        method: 'PUT',
        url: '/updateCar/:id',
        handler: controller.updateCar
    },
    {
        method: 'DELETE',
        url: '/deleteCar/:id',
        handler: controller.deleteCar
    }
];

module.exports = carsRoutes;