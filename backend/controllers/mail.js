import nodemailer from 'nodemailer';
import { User } from "../models/user.js";
import moment from 'moment';
import cron from 'node-cron';



// Function to send email
export const sendMail = (user,time,order,customize,message) => {

  // Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOLDEN_EMAIL,
    pass: process.env.GOLDEN_PASSWORD,
  }
});
function generateRandomInvoiceNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  const invoiceNumber = `INV-${randomNumber.toString().padStart(6, '0')}`; // Pad the random number with leading zeros and add a prefix
  return invoiceNumber;
}
function formatDate() {
  var date = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
  var emailBody;
 var count=1,total=0;

 function totalPrice() {
  order.map((item)=>{
    total+=item.price
  })
  total+=50;
  return total;
}
  if(!customize) //FOR NORMAL CAKE ORDERS
  {
    emailBody = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
    
            .invoice {
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .invoice-header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .invoice-header h1 {
                color: #333;
            }
    
            .invoice-details {
                margin-bottom: 20px;
            }
    
            .invoice-details table {
                width: 100%;
                border-collapse: collapse;
            }
    
            .invoice-details th, .invoice-details td {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: left;
            }
    
            .invoice-items {
                margin-bottom: 20px;
            }
    
            .invoice-items table {
                width: 100%;
                border-collapse: collapse;
            }
    
            .invoice-items th, .invoice-items td {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: left;
            }
    
            .invoice-total {
                text-align: right;
            }
    
            .invoice-total p {
                font-weight: bold;
            }
    
            .footer {
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="invoice">
            <div class="invoice-header">
                <h1>Golde Cake Shop</h1>
                <h1>Invoice</h1>
            </div>
            <div class="invoice-details">
                <table>
                    <tr>
                        <th>Invoice Number:</th>
                        <td>${generateRandomInvoiceNumber()}</td>
                    </tr>
                    <tr>
                        <th>Date:</th>
                        <td>${formatDate()}</td>
                    </tr>
                </table>
            </div>
            <div class="invoice-items">
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Flavour</th>
                        <th>Weight</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    ${order.map((item, index) =>`
                      
                        ${!item.customize?`
                        <tr>
                          <td><img style="display:block;" width="100%" height="100%" src=${item.image[0]} /></td>
                          <td>${item.name}</td>
                          <td>${item.flavour}</td>
                          <td>${item.wt}</td>
                          <td>${item.amount}</td>
                          <td>${item.price}</td>
                        </tr>
                        `:"after Price are Decided by our agency for your customization cake,you got email for order conformation."}
                      `).join('')}
                    
                </table>
            </div>
            <div class="invoice-total">
                <p>Shipping Fee : 50 Rs. </p>
                <p>Total: ${totalPrice()} Rs.</p>
            </div>
        </div>
        <div class="footer">
          <p>Above cakes are confirmed, but if you order customized cakes,then you got a mail after conformation of Golden cakeshop.</p>
          <p>If you have any queries, please feel free to contact us: <b>7990554541</b></p>
          <p>Thank you for your orders!</p> <br/>
        </div>
    </body>
    </html>    
    `;
  }
  else if(customize===1){ //FOR CUSTOMIZE WITH CONFIRMATION
    let price=parseInt(message)
    emailBody = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
    
            .invoice {
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .invoice-header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .invoice-header h1 {
                color: #333;
            }
    
            .invoice-details {
                margin-bottom: 20px;
            }
    
            .invoice-details table {
                width: 100%;
                border-collapse: collapse;
            }
    
            .invoice-details th, .invoice-details td {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: left;
            }
    
            .invoice-items {
                margin-bottom: 20px;
            }
    
            .invoice-items table {
                width: 100%;
                border-collapse: collapse;
            }
    
            .invoice-items th, .invoice-items td {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: left;
            }
    
            .invoice-total {
                text-align: right;
            }
    
            .invoice-total p {
                font-weight: bold;
            }
    
            .footer {
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="invoice">
            <div class="invoice-header">
                <h1>Invoice</h1>
            </div>
            <div class="invoice-details">
                <table>
                    <tr>
                        <th>Invoice Number:</th>
                        <td>${generateRandomInvoiceNumber()}</td>
                    </tr>
                    <tr>
                        <th>Date:</th>
                        <td>${new Date().now().toLocalString()}</td>
                    </tr>
                </table>
            </div>
            <div class="invoice-items">
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>Item 1</td>
                        <td>2</td>
                        <td>$50.00</td>
                        <td>$100.00</td>
                    </tr>
                    <tr>
                        <td>Item 2</td>
                        <td>3</td>
                        <td>$30.00</td>
                        <td>$90.00</td>
                    </tr>
                </table>
            </div>
            <div class="invoice-total">
                <p>Total: $190.00</p>
            </div>
        </div>
        <div class="footer">
            <p>Thank you for your business!</p>
        </div>
    </body>
    </html>    
    `;
  //   emailBody = `
  //   <html>
  //    <head>
  //    <style>
  //      .heading{
  //       color:green;
  //      }
  //      </style>
  //    </head>
  //     <body>
  //       <h2>Order Confirmation for Customize Cakes</h2>
  //       <p>Dear ${user.name},</p>
  //       <p class="heading">Your orders have been confirmed. Please find the order details below:</p>
  
  //         <ul>
  //           <li>Cake: ${order.name}</li>
  //           <li>Flavour: ${order.flavour}</li>
  //           <li>Weight: ${order.wt}</li>
  //           <li>Price: ${price} Rs.</li>
  //           <li>Quantity: ${order.amount} </li>
  //           <li>Delivery Time: ${time}</li>
  //           <li><b>Total Price: ${price} Rs.</b></li>
  //         </ul>
  //       <p>Thank you for your orders!</p> <br/>
  //       <p>If you have any queries, please feel free to contact us: <b>7990554541</b></p>
  //     </body>
  //   </html>
  // `;
  }
  else if(customize===2){ //FOR CUSTOMIZATION WITH DENIED
    emailBody = `
    <html>
    <head>
    <style>
    .heading{
     color:red;
    }
    </style>
  </head>
      <body>
        <h2>Order Confirmation for Customize Cakes</h2>
        <p>Dear ${user.name},</p>
        <p class="heading">Sorry, but your design and customization is not able to made by our cakeshop.</p>
         <h4>Following is the problem with your customization:</h4>
          <p>${message}</p>
        <p>Above cakes are confirmed, but if you order customized cakes,then you got a mail after conformation of Golden cakeshop.</p>
        <p>Thank you for your time,please order once again with good customization.</p> <br/>
        <p>If you have any queries, please feel free to contact us: <b>7990554541</b></p>
      </body>
    </html>
  `;
  }
  else{
    emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Birthday Reminder</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; text-align: center; padding: 20px;">
    
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
            <tr>
                <td align="center" style="padding: 20px;">
                    <img src="https://image.winudf.com/v2/image1/Y29tLnN0bC5iaXJ0aGRheXJlbWluZGVyX3NjcmVlbl8wXzE1Nzg1Mjg5MjBfMDk5/screen-0.webp?fakeurl=1&type=.webp" alt="Birthday Cake" width="200" style="border-radius: 10px;">
                    <h1 style="font-size: 24px; margin-top: 20px; color: #333;">Birthday Reminder</h1>
                    <!-- <p style="font-size: 16px; color: #666;">Don't forget to order a delicious cake for the upcoming birthday!</p> -->
                    <p>Dear ${user.name},</p>
                    <p class="heading">Wishing you a very happy birthday in Advance!</p>
                     
                      
                    <p style="font-size: 16px; color: #666;">Birthday without Cakes are nothing right? Hoping that on your previous Birthday,You enjoyed our cake!</p> <br/>
                    <p style="font-size: 16px; color: #666;">Book Your Cake now with some Delicious new Flavours & Design,to make your birthday more special. </p>
                    <h4>Special Discount of 10% for You</h4>
                    <p style="font-size: 16px; color: #666;">
                    <b>Use Coupon Code :: <b>
                            
                                BIRTHDISC
                            

                    </p>                   
                    <p>Best regards,\nGolden Cakeshop</p>
                    <a href="http://localhost:3000/" style="text-decoration: none; background-color: #FF5722; color: #fff; padding: 10px 20px; border-radius: 5px; font-size: 18px; margin-top: 20px; display: inline-block;">Order Now</a>
                </td>
            </tr>
        </table>
    
    </body>
    </html>
    
  `;
  }
 




  const mailOptions = {
    from: process.env.GOLDEN_EMAIL,
    to: user.email,
    subject: "Golden Cakeshop",
    html: emailBody,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Send emails to users whose birthday is tomorrow
export const sendMails = async() => {

const tomorrow = moment().add(1, 'day').startOf('day');
const user=await User.find();
const tomorrowBirthdays = user.filter(userr => (moment(userr.date).format("MM-DD"))===(tomorrow.format("MM-DD")));

for (const user of tomorrowBirthdays) {
  await sendMail(user,"","",5,""); // Function to send birthday email
}
}

//to daily check at 11:15 AM,whose birthday at tommorow
cron.schedule('40 13 * * *', async () => {
  console.log('Birthday reminder emails sent successfully'); 
  try {
    console.log('Birthday reminder emails sent successfully');  
    await sendMails();
  } catch (error) {
    console.error('Failed to send birthday reminder emails:', error);
  }
});