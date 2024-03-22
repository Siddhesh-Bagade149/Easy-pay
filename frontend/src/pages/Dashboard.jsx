import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"


export const Dashboard = () => {
    const name=localStorage.getItem("firstName")
    return <div>
       <AppBar name={name}/>
       <Balance name={name} value={'100050'} />
       <Users />
    </div>
}