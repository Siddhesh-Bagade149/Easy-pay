import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "OP",
      lastName: "RAo",
      _id: 1,
    },
  ]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, []);
  return (
    <div className="pl-6">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search...."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
      {users.map(user => <User user={user} key={user._id}/>)}
      </div>
    </div>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between p-4 ">
      <div className="flex justify-between ">
        <div className="flex justify-center">
          <div className="rounded-full bg-slate-300 h-12 w-12 text-center flex flex-col justify-center">
            {user.firstName[0]}
          </div>
          <div className="flex flex-col justify-center ml-4 font-semibold">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
