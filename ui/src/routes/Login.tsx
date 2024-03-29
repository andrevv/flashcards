import { useContext, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [error, setError] = useState<string>();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <div className="min-h-screen bg-rose-100 flex justify-center shadow-xl">
        <div className="p-8 flex-1">
          <div className="w-80 bg-white rounder-xl mx-auto overflow-hidden shadow-xl">
            <div className="relative h-48 bg-rose-500">
              <svg
                className="absolute bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="px-10 pt-4 pb-8 bg-white rounded-tr-3xl">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome back!
              </h1>
              {error && (
                <div className="mt-8 bg-red-100 p-4 text-red-600 font-semibold rounded-md flex items-center gap-2">
                  <ExclamationCircleIcon className="w-5 h-5" />
                  <div>{error}</div>
                </div>
              )}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async ({ email, password }) => {
                  await auth.signIn(email, password, () => {
                    navigate("/");
                  });
                }}
              >
                {({ errors, touched }) => (
                  <Form className="mt-12">
                    <div className="relative">
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 placeholder-transparent"
                        placeholder="Email address"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-700 font-semibold opacity-90 py-2">
                          {errors.email}
                        </div>
                      ) : null}
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                      >
                        Email address
                      </label>
                    </div>
                    <div className="mt-10 relative">
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 placeholder-transparent"
                        placeholder="Password"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-700 font-semibold opacity-90 py-2">
                          {errors.password}
                        </div>
                      ) : null}
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                      >
                        Password
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-50 cursor-pointer"
                    >
                      Sign In
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
