import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import AppError from "../utils/errorHandler";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User)

interface UserMethods{
    registerUser: (req: Request, res: Response, next: NextFunction) => void
}

const UserController: UserMethods = {
    registerUser: async (request: Request, response: Response, next: NextFunction) => {
        try{
            const {
                firstName, 
                lastName,
                email,
                password,
                passwordConfirmation,
                photo
            } = request.body

            const user=new User()
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.password = password
            user.passwordConfirmation = passwordConfirmation
            user.photo = photo

            await userRepository.save(user)

            response.status(201).json({ status:'ok',message: 'User registered successfully' });

        }catch(err){
            next(err)
        }
    }
}

export default UserController