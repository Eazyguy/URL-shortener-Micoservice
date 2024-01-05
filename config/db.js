const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:"./sample.env"})


const ConnectDB = async()=>{
	try{
		await mongoose.connect(process.env.DATABASE)
	console.log("MongoDB Connected")
		
	}catch(err){
		console.error(err)
	}
}

module.exports = ConnectDB