import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/User";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Authenticate() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { login, signup } = useUser();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate("/dashboard");
        }
      } else {
        const success = await signup(formData);
        if (success) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const containerVariants = {
    initial: {
      opacity: 0,
      x: "-50vw",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
    exit: {
      opacity: 0,
      x: "50vw",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        duration: 0.1,
      },
    },
  };

  return (
    <div className="overflow-hidden w-full h-screen flex flex-col items-center justify-center bg-[url('/bg.png')] bg-[length:70%] bg-center bg-no-repeat">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "signup"}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="w-3/4 lg:w-2/7 h-full flex flex-col bg-white rounded-lg shadow-lg items-center justify-center p-10">
            <h1 className="text-2xl font-bold">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            <form
              className="w-full flex flex-col items-center justify-center gap-10 m-10"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <input
                  className="w-full outline-none border border-gray-300 p-2 rounded-md focus:border-gocomet placeholder:text-gocomet text-gray-500"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <input
                className="w-full outline-none border border-gray-300 p-2 rounded-md focus:border-gocomet placeholder:text-gocomet text-gray-500"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="w-full outline-none border border-gray-300 p-2 rounded-md focus:border-gocomet placeholder:text-gocomet text-gray-500"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-24 hover:font-bold transition-all duration-700 text-white px-4 py-2 rounded-md font-gocomet bg-linear-to-r from-blue-950/100 to-gocomet"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="text-gray-500 font-roboto">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gocomet hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
