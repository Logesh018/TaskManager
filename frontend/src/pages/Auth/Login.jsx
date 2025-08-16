import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from "react-router-dom"
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!password) {
      setError("Please enter the password");
      return;
    }

    // Clear error only when validation passes
    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-4/4 md:w-full flex flex-col items-center-safe justify-center mt-5">
        <h3 className="text-2xl font-semibold text-center mb-2">Welcome Back</h3>
        <p className="text-gray-500 text-center mb-8">
          Please enter your details to Log In
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 6 Characters"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs pb-2.5">{error}</p>
          )}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login


