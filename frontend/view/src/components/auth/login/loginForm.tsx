"use client";
import ButtonGroup from "./buttonsIcon";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { login, check_authenticated } from "@/redux/slices/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  wallet_address: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    // Llama a la función check_authenticated al montar el componente
    dispatch(check_authenticated());
  }, []);

  const [loading, setLoading] = useState(false);
  const [successServer, setSuccessServer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    wallet_address: "",
  });
  useEffect(() => {
    if (successServer) {
      router.push("/auth/user");
    }
  }, [successServer]);
  const { email, password, wallet_address } = formData;
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    dispatch(
      login(email, password, wallet_address, setLoading, setSuccessServer)
    );
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
              className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onChange(e)}
              name="password"
              required
            />
            <button
              className="pl-2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
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
            {loading ? (
              <div role="status" className="w-full flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-violet-600 animate-spin  fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>Iniciar Sesión</>
            )}
          </button>
        </form>
        {/*<ButtonGroup />} {/* <ButtonGroup setWeb3={setWeb3}/> */}
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
