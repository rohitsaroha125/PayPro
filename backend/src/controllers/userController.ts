import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import AppError from "../utils/errorHandler";
import { AppDataSource } from "../data-source";
import * as jwt from 'jsonwebtoken'

const userRepository = AppDataSource.getRepository(User)

interface UserMethods{
    registerUser: (req: Request, res: Response, next: NextFunction) => void,
    loginUser: (req: Request, res: Response, next: NextFunction) => void
}

const UserController: UserMethods = {
    registerUser: async (request: Request, response: Response, next: NextFunction) => {
        try{
            const {
                firstName, 
                lastName,
                email,
                password,
                photo
            } = request.body

            const user=new User()
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.password = password
            user.photo = photo

            await userRepository.save(user)

            response.status(201).json({ status:'ok',message: 'User registered successfully' });

        }catch(err){
            next(new AppError(err.message, 'fail', 500))
        }
    },

    loginUser: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const {email, password} = request.body 

            if (!email || !password) {
                next(new AppError('Please enter valid email and password', 'error', 401))
            }

            const user = await userRepository.findOne({where:{email}})

            if (!user) {
                next(new AppError('No such email found', 'error', 401))
            }

            const userFound = await user.checkIfUnencryptedPasswordIsValid(password)

            if (userFound) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, process.env.JWT_SECRET_TOKEN, { expiresIn: 60 * 60 })

                const { password: _, ...userResponse } = user;

                response.status(401).json({
                    status:'ok',
                    message: 'Login Successful!',
                    data:{
                        user: userResponse,
                        token
                    }
                })
            } else {
                next(new AppError('Please enter valid email and password now', 'error', 401))
            }

        } catch(err) {
            next(new AppError(err.message, 'fail', 500))
        }
    }
}

export default UserController