var amqp = require('amqplib');
var url = '<connection-url>';
var connection = amqp.connect(url)
var channel = connection.then( function(c){
    return c.createChannel().then((channel)=>{
        return channel
    })
})
module.exports = channel