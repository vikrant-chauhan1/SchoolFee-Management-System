import { useState } from "react";
import axios from "axios";

const Fees = ()=>{
    const [feeRecord,getFeeRecord] = useState(null);
    const [id,setId] = useState("")

    const getFees = async()=>{
        const token = localStorage.getItem("token")
        const result = await axios.get(`http://localhost:5000/api/fees/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

        )
    }

}