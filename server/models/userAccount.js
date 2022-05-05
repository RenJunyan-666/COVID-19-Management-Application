import mongoose from "mongoose";

const userAccountSchema = mongoose.Schema({
   email: String,
   roles: {
      User: {
         type: Number,
         default: 2001
      },
      Editor: Number,
      Admin: Number
   },
   password: String,
   userInfo: {
      name: String,
      gender: String,
      age: String,
      birth: Date,
      address: String,
      phone: String,
      email: String
   },
   vaccineInfo: {
      patient: String,
      orderDate: Date,
      location: String,
      dose: String,
      insurance: String,
      vaccineType: String,
      provider: String,
      status: Boolean
   },
   testInfo: {
      patient: String,
      orderDate: Date,
      location: String,
      testType: String,
      completedDate: Date,
      provider: String,
      method: String,
      result: String,
      status: Boolean
   },
   refreshToken: String
});




const userAccount = mongoose.model('UserAccount', userAccountSchema)

export default userAccount



