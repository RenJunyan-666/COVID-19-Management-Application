import mongoose from "mongoose"
import userAccount from "../models/userAccount.js"

export const getUserAccounts = async (req, res)=>{
    try{
        const userAccounts = await userAccount.find()
        console.log(userAccounts)
        res.status(200).json(userAccounts)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const getUserAccountsByUser = async (req, res) => {
    try{
        const user = req.params.email;
        const foundUser = await userAccount.findOne({ email: user }).exec();
        res.status(200).json(foundUser._id);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const addUserAccounts = async (req, res)=>{
    const newUserAccount = new userAccount(req.body)

    try{
        await newUserAccount.save()
        res.status(201).json(newUserAccount)
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

export const updateUserAccounts = async (req, res)=>{
    const {id:_id} = req.params

    const updateUserAccounts = await userAccount.findByIdAndUpdate(_id, req.body, {new:true})

    res.json(updateUserAccounts)
}

export const deleteUserAccounts = async (req, res)=>{
    const {id} = req.params

    await userAccount.findByIdAndRemove(id)

    res.json({message:'user account deleted successfully'})
}