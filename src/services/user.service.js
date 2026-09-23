import { userRepository } from "../repositories/user.repository.js";

class User{
    async findById(userId){
        const user=await userRepository.findById(userId);
        console.log("ddd",user)
        return user;
    }
    async findByUsername(username){
        const user=await userRepository.findByUsername(username)
        return user
    }
}
export const user=new User();