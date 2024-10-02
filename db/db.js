const mongoose = require("mongoose");
const db = async()=>{
    try {
        mongoose.set('strictQuery',false)
        mongoose.connect(process.env.MONGO_URL,{  useUnifiedTopology: true}).then(() => console.log('db connected'))
        .catch(err => console.error('Connection error', err));
    } catch (error) {
        console.log("DB Connection error")
    }
}
module.exports = {db}