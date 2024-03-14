const {Worker} = require('bullmq');
const SibApiV3Sdk = require('sib-api-v3-sdk')

// if want then send mail from heare 
// async function sendMail(data){

//   const {sender, recipient, subject, body  } = data
//   var defaultClient = SibApiV3Sdk.ApiClient.instance; 
//   var apiKey = defaultClient.authentications['api-key'];
//   apiKey.apiKey = process.env.API_KEY

  
//   let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()


//      try{
//     let respemail = await tranEmailApi.sendTransacEmail({
//       sender,
//       to: recipient,
//       subject: subject,
//       textContent: body
//      })
//     }
// catch(err){
//  console.log('something wrong with email send',err)
// }
// }
  
const worker = new Worker("email-queue", async (job)=>{
    console.log(`worker working on ${job.id} with ${job.data.sender}`)
    //await sendMail(job.data)
  
},
{ connection: {
    host: 'localhost',
    port: 6379,
  },
    }

)

