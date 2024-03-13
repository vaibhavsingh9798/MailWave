const {Worker} = require('bullmq');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD
    },
  });


async function sendEmail(job) {
    const { sender , recipient , subject, body } = job.data;
    console.log('revied info',sender , recipient , subject, body)

      var mailOptions = {
        from: sender,
        to: recipient,
        subject,
        text: body
      };
      try{
        const info = await transporter.sendMail(mailOptions);
          console.log("Message sent: %s", info.messageId);
      }catch(err){
        console.log('err...',err)
      }
      
     }
  

const worker = new Worker("email-queue", async (job)=>{

    console.log(`worker working on ${job.id}`)
    await sendEmail(job)
},
{ connection: {
    host: 'localhost',
    port: 6379,
  },
    }

)