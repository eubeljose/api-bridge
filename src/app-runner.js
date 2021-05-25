fastify = require('fastify')();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

let Gateway = require('./gateway');
Gateway.init();

function performRun(reply){

  var options = {
    host: "bots.business",
    port: 80,
    path: '/',
    method: 'GET'
  };

  var http = require('http');

  http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }).end();

  reply.send({ status: 'OK' })
}

fastify.get('/', async (request, reply) => {
  return { status: 'API-Bridge: OK' }
})

fastify.get('/run', async (request, reply) => {
  
  performRun(reply)

})

const start = async () => {
  try {
    await fastify.listen(PORT, HOST, function (err, address) {
      if (err) {
        console.log(err);
        process.exit(1)
      }
      console.log(`server listening on ${address}`);
    })
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

start()