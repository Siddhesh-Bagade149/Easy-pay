import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
          <Heading label={"Sign-In"} />
          <SubHeading
            content={"Have and account? Enter your informationn to login"}
          />
          <InputBox label={"Email-id"} placeholder={"xyz@gmail.com"} />
          <InputBox label={"Password"} placeholder={"********"} />
          <Button label={"Sign-In"} />
          <BottomWarning
            buttonText={"Signup"}
            label={"Not a user, Signup now"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
