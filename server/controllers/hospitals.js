import hospital from '../models/hospital.js'

export const getHospitals = async (req, res)=>{
    try{
        const hospitals = await hospital.find()
        //console.log(hospitals)
        res.status(200).json(hospitals)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}