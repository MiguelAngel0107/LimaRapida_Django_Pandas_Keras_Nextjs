"use client";
import ButtonGroup from "./buttonsIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { signup, check_authenticated } from "@/redux/slices/actions/auth";

interface FormData {
  name: string;
  email: string;
  password: string;
  re_password: string;
  wallet_address: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // Llama a la función check_authenticated al montar el componente
    dispatch(check_authenticated());
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    re_password: "",
    wallet_address: "",
  });

  const { name, email, password, re_password, wallet_address } = formData;
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    //dispatch(signup(name, email, password, re_password, wallet_address));
    router.push("/auth/login");
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Create an account
        </h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="full name"
            >
              Full name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              onChange={(e) => onChange(e)}
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => onChange(e)}
              name="email"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => onChange(e)}
              name="password"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password-confirmation"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={re_password}
              onChange={(e) => onChange(e)}
              name="re_password"
              required
            />
          </div>

          <button className="w-full py-2 mt-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300">
            Create Account
          </button>
        </form>
        <ButtonGroup /> {/* <ButtonGroup setWeb3={setWeb3}/> */}
        <p className="text-center mt-6 text-gray-700">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="login/"
            className="text-indigo-600 font-semibold hover:text-indigo-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
