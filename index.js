const fastify = require('fastify')({ logger: true });
const carsRoutes = require('./routes/cars');

carsRoutes.forEach((routes) => {
    fastify.route(routes);
});

const start = async () => {
    try {
        await fastify.listen({ port: 2323 });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();