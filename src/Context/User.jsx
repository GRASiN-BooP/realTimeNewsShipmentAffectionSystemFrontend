import { createContext, useContext, useState } from "react";
import { ENDPOINTS, axiosInstance } from "../Services/API";
import toast from "react-hot-toast";

const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  const login = async (email, password) => {
    const loadingToast = toast.loading("Logging in...");
    try {
      const response = await axiosInstance.post(ENDPOINTS.LOGIN, {
        email: email,
        password: password,
      });
      if (response.data.success) {
        setUser(response.data.data.user);
        setToken(response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
        toast.dismiss(loadingToast);
        toast.success("Successfully logged in!");
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Login failed. Please try again.");
      console.log(error);
      return false;
    }
  };

  const signup = async (formData) => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      const response = await axiosInstance.post(ENDPOINTS.SIGNUP, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (response.data.success) {
        setUser(response.data.data.user);
        setToken(response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
        toast.dismiss(loadingToast);
        toast.success("Account created successfully!");
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Signup failed. Please try again.");
      return false;
    }
  };

  const logout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.dismiss(loadingToast);
      toast.success("Successfully logged out!");
      return true;
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Logout failed. Please try again.");
      return false;
    }
  };

  const getUser = async () => {
    try {
      if (token) {
        const respone = await axiosInstance.get(ENDPOINTS.GET_USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (respone.data.success) {
          setUser(respone.data.data.user);
          return true;
        } else {
          throw new Error(respone.data.message);
        }
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getSummaryCount = async () => {
    try {
      if (token) {
        const response = await axiosInstance.get(ENDPOINTS.GET_SUMMARY_COUNT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          return response.data.data;
        } else {
          throw new Error(response.data.message);
        }
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getIncidents = async () => {
    try {
      if (token) {
        const response = await axiosInstance.get(ENDPOINTS.GET_INCIDENTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          return response.data.data;
        } else {
          throw new Error(response.data.message);
        }
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <userContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        getUser,
        getSummaryCount,
        getIncidents,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

const useUser = () => {
  return useContext(userContext);
};

export { useUser };
