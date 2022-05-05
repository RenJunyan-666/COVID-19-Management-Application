import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
     hospitalName:String,
     address:String,
     hospitalPhone:String
})


const hospital = mongoose.model('Hospital', hospitalSchema)

export default hospital
