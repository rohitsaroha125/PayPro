import { useState } from "react";
import axios from "axios";
import toastr from "toastr";

export interface HttpRequest{
    url?: string | undefined;
    method: string,
    headers?: any,
    params?:any,
    data?:any
}


const useHttpRequest = (transformData: any) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const sendRequest = async (reqOptions: HttpRequest) => {
        setLoading(true)
        setError(false)

        try{
            const {data} = await axios(reqOptions)
            transformData(data)
        }catch(err: any) {
            setError(true)
            toastr.error(err.message, "Error");
        }
        setLoading(false)
    }

    return {loading, error, sendRequest}

}

export default useHttpRequest