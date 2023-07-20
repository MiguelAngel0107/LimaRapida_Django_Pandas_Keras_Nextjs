import RegisterForm from "./register/registerForm";
//import RegisterWeb3 from "./register/registerWeb3";

//import { useState } from "react";

const Register = () => {
  //const [web3, setWeb3] = useState(false);

  return (
    <>
      {/*web3 ? (
        //<RegisterWeb3 web3={web3} setWeb3={setWeb3} />
        <RegisterForm setWeb3={setWeb3} />
      ) : (
        <RegisterForm setWeb3={setWeb3} />
      )*/}
      <RegisterForm /> {/* <RegisterForm setWeb3={setWeb3} /> */}
    </>
  );
};

export default Register;
