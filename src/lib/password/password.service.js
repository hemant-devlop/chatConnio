import bcrypt from 'bcrypt'
import config from '../../config/index.js'
class PasswordService{
    hash(password){
        return bcrypt.hash(password,config.security.bcryptRounds)        
    }
    compare(plainPassword,passwordHash){
        return bcrypt.compare(plainPassword,passwordHash)        
    }
}

export const passwordService=new PasswordService()