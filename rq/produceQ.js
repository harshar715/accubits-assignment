var Channel = require('./channel');

module.exports = produceQ
function produceQ(task, queueName, data = {}) {
   return Channel.then((c) => {
      return c.assertQueue(queueName, { durable: true }).then((ok) => {
         return c.sendToQueue(queueName, encode({ task: task, data: data }), { persistent: true })
      })
   }).catch((err) => { console.log(err); return err })

   function encode(task) {
      return new Buffer(JSON.stringify(task));
   }
}
