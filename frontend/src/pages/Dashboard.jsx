import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"


export const Dashboard = () => {
    return <div>
       <AppBar/>
       <Balance value={'100050'} />
       <Users />
    </div>
}