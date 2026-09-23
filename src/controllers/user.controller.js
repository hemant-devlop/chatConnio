import mongoose from "mongoose";
import { user } from "../services/user.service.js"
import { userRepository } from "../repositories/user.repository.js";

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(200).json({
                success: false,
                messaage: "invalid or userId not found",
            })
        }
        if (!mongoose.isObjectIdOrHexString(userId)) {
            return res.status(400).json({
                success: false,
                message: "userId is not valid Id",
            })
        }
        const userData = await user.findById(userId);

        return res.status(200).json({
            success: true,
            data: userData,
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: 'invalid or expired refresh token',
        });
    }
}

export const getMe =async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            data: req.user,
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'invalid or expired refresh token'
        });
    }
}

export const findUserByUsername = async (req, res) => {
    const userQuery = req.query;
    if (!userQuery.username) {
        res.status(400).json({
            success: false,
            message: "username required"
        })

    }
    const userData = await userRepository.findByUsername(userQuery)
    if(!userData){
       return res.status(200).json({
        success: false,
        message:"user not found"
    })
    }
    res.status(200).json({
        success: true,
        data: userData
    })
}