import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import privateRoutes from '../utils/privateRoutes'
import TransactionController from '../controllers/transactionController'

const router = express.Router()

router.get('/',privateRoutes, TransactionController.getTransactions)
router.get('/:id',privateRoutes, TransactionController.viewTransactionById)
router.post('/', privateRoutes, TransactionController.recordTransaction)


export default router