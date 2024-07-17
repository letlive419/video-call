const jwt = require('jsonwebtoken');
require('dotenv').config()

const key = process.env.NEXT_PUBLIC_API_KEY;
const secret = process.env.NEXT_PUBLIC_API_SECRET;

console.log(`key and secret: ${key} and ${secret}`)


const options = { 
 expiresIn: '120m', 
 algorithm: 'HS256' 
};

const payload = {
 apikey: key,
 permissions: [`allow_join`], // `ask_join` || `allow_mod` 
};

const token = jwt.sign(payload, secret, options);
console.log(`token: ${token}`);

const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    
    return roomId;
  };

  



 module.exports = {
  createMeeting,
  token
 }
