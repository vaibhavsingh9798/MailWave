const {Queue} = require('bullmq');

const sendEmailQueue = new Queue("email-queue",{ connection: {
    host: 'localhost',
    port: 6379,
  },
    });

async function addEmailQueue(data){
    const res = await sendEmailQueue.add("email-send",{...data})
    console.log(`job added ${res.id}`)
}



 module.exports = {addEmailQueue}