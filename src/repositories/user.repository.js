import { User } from "../models/user.model.js";


 class UserRepository{
   async create(userData) {
        return User.create(userData);
    }
    async findByEmail(email) {
        return User.findOne({ email }).lean();
    }
    async findByUsername(username) {
        return User.findOne(username).lean();
    }
    async findByEmailWithPassword(email) {
        return User.findOne({ email }).select("+passwordHash").lean();
    }
    async findById(id) {
        return User.findById(id);
    }
    async exists(email) {
        return User.exists({ email });

    }
    async updateLastLogin(id) {
        return User.findByIdAndUpdate(id,
            { lastLoginAt: new Date() },
            { new: true }
        );
    }
    async incrementFailedAttempts(id) {
        return User.findByIdAndUpdate(id,
            { $inc: { failedLoginAttempts: 1 } }
        );
    }
    async resetFailedAttempts(id) {
        return User.findByIdAndUpdate(id,
            { failedLoginAttempts: 0, lockUntil: null }
        );
    }
    async updatePassword(id, passwordHash) {
        return User.findByIdAndUpdate( id,
            {  passwordHash,  passwordChangedAt: new Date()}
        );
    }
}


export const userRepository=new UserRepository()