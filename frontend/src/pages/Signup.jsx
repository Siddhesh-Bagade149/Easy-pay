import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning"
export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
        <Heading label={"Sign-Up"} />
        <SubHeading content={"Enter your informtation to create an account"} />
        <InputBox label={'First Name'} placeholder={'Enter first name'}/>
        <InputBox label={'Last Name'} placeholder={'Enter last name'}/>
        <InputBox label={'Email-id'} placeholder={'Enter email-id'}/>
        <InputBox label={'Password'} placeholder={'*********'}/>
        <Button label={'Sign Up'}/>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
      </div>
    </div>
  );
};
