import { Request, Response, NextFunction } from "express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import AppError from "../utils/errorHandler";
import { AppDataSource } from "../data-source";
import { PrivateRequest } from "../typeHelpers/requestType";
import { Like } from "typeorm";

const transactionRepository = AppDataSource.getRepository(Transaction)
const userRepository = AppDataSource.getRepository(User)

type funcType = (req:Request, res: Response, next:NextFunction) => void

interface TransactionMethods{
    getTransactions: funcType
    viewTransactionById:funcType
    recordTransaction:funcType
}

const TransactionController: TransactionMethods = {
    getTransactions: async(req:PrivateRequest, res: Response, next: NextFunction) => {
        try{
            const {pageNo, pageSize, searchQuery} = req.query

            if (isNaN(Number(pageNo)) || isNaN(Number(pageSize))) {
                next(new AppError('Invalid pageNo or pageSize', 'fail', 401))
              }

            const recordsCriteria = {
                where:[
                    {senderId: req.user.id},
                    {receiverId: req.user.id},
                ],
                skip: (Number(pageNo)-1) * Number(pageSize),
                take: (Number(pageNo)) * Number(pageSize)
            }

            const transactions=await transactionRepository.find(recordsCriteria)

            res.status(200).json({
                status:'ok',
                message:'Transactions Found!',
                data:{
                    transactions
                }
            })
        }catch(err){
            next(new AppError(err.message, 'error', 500))
        }
    },
    viewTransactionById: async (req:Request, res:Response, next:NextFunction) => {
        try{
            const {id} = req.params

            const transaction = await transactionRepository.findOne({ where: { id: Number(id) } });

            if (!transaction) {
                next(new AppError('Transaction Not Found!', 'fail', 404))
            } 

            res.status(200).json({
                status:'ok',
                message:'Transaction Found!',
                data:{
                    transaction
                }
            })
        }catch(err) {
            next(new AppError(err.message, 'error', 500))
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

            sender.balance -= amount
            receiver.balance += amount

            await userRepository.save([sender, receiver])

            res.status(201).json({
                status: 'ok',
                message: 'Transaction Recorded!',
                data: {
                    transaction
                }
            })

        }catch(err) {
            next(new AppError(err.message, 'error', 500))
        }
    },
}

export default TransactionController