"use client";
import ButtonGroup from "./buttonsIcon";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { login, check_authenticated } from "@/redux/slices/actions/auth";

interface FormData {
  email: string;
  password: string;
  wallet_address: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Llama a la función check_authenticated al montar el componente
    dispatch(check_authenticated());
  }, []);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    wallet_address: "",
  });
  const { email, password, wallet_address } = formData;
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password, wallet_address));
  };
  return (
    <div className="flex flex-col justify-center items-center h-[1000px] bg-gray-950">
      <h1 className="bg-gradient-to-b from-purple-950/60 to-gray-950 text-4xl p-6 w-full max-w-md rounded-3xl font-bold text-white mb-12 text-center">
        Login
      </h1>
      <div className="bg-gradient-to-t from-purple-950/60 to-gray-950 w-full max-w-md p-6 rounded-3xl shadow-md">
        <form onSubmit={(e) => onSubmit(e)} className="text-white">
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => onChange(e)}
              name="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => onChange(e)}
              name="password"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="font-semibold">
                Recuérdame
              </label>
            </div>
            <Link
              href="auth/forgot-password/"
              className="text-violet-600 font-semibold hover:text-violet-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-6 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-800 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        <ButtonGroup /> {/* <ButtonGroup setWeb3={setWeb3}/> */}
        <p className="text-center mt-6 text-white">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/register"
            className="text-violet-400 font-semibold hover:text-violet-600"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
