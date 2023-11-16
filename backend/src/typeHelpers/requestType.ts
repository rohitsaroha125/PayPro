import { Request } from "express"

export interface PrivateRequest extends Request{
    user: {
        id: number,
        email: string
    }
}