import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import privateRoutes from '../utils/privateRoutes'

const router = express.Router()

router.get('/',privateRoutes, (req: Request,res: Response,next: NextFunction) => {
    res.send('Hello world')
})

export default router