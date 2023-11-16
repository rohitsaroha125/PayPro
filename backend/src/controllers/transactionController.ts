import { Request, Response, NextFunction } from "express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import AppError from "../utils/errorHandler";
import { AppDataSource } from "../data-source";
import * as jwt from 'jsonwebtoken'

const transactionRepository = AppDataSource.getRepository(Transaction)
const userRepository = AppDataSource.getRepository(User)

type funcType = (req:Request, res: Response, next:NextFunction) => void

interface TransactionMethods{
    getTransactions: funcType
    viewTransactionById:funcType
    recordTransaction:funcType
}

const TransactionController: TransactionMethods = {
    getTransactions: async(req:Request, res: Response, next: NextFunction) => {
        try{

        }catch(err){

        }
    },
    viewTransactionById: async (req:Request, res:Response, next:NextFunction) => {
        try{

        }catch(err) {

        }
    },
    recordTransaction: async(req:Request, res:Response, next:NextFunction) => {
        try{
            const {senderId, receiverId, amount} = req.body

            if (!senderId || !receiverId || !amount || isNaN(amount) || amount <= 0) {
                next(new AppError('Invalid input. Please provide valid senderId, receiverId, and amount.', 'fail', 400))
            }

            const sender = await userRepository.findOne({where:{id: senderId}})
            const receiver = await userRepository.findOne({where:{id: receiverId}})

            if (!sender || !receiver) {
                next(new AppError('Sender or reciever not found', 'fail', 404))
            }

            const transaction = new Transaction()
            transaction.senderId = senderId
            transaction.receiverId = receiverId
            transaction.amount = amount

            await transactionRepository.save(transaction)

            console.log('api call', sender)

            sender.balance -= amount
            receiver.balance += amount

            await userRepository.save([sender, receiver])

            res.status(201).json({
                status: 'ok',
                message: 'Transaction Recorded',
                data: {
                    transaction
                }
            })

        }catch(err) {
            console.log('error is ', err)
            next(new AppError(err.message, 'error', 500))
        }
    },
}

export default TransactionController