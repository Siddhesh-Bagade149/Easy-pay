import { useEffect, useState } from "react"
import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"


export const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [money, setMoney] = useState(0);
    useEffect(() => {
        axios.get('https://easy-pay-backend.onrender.com/account/balance', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setMoney(response.data.balance)
        }).catch((error) => {
            console.log('error is=' + error);
        });
    }, [token])
    const name = localStorage.getItem("firstName")
    return <div>
        <AppBar name={name} />
        <Balance name={name} value={money.toFixed(2)} />
        <Users />
    </div>
}