import { createContext, useContext, useState } from "react";
import { ENDPOINTS, axiosInstance } from "../Services/API";

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

  const login = async (formData) => {
    // try {
    //   const respone = await axiosInstance.post(ENDPOINTS.LOGIN, formData);
    //   if (respone.success) {
    //     setUser(respone.data.user);
    //     setToken(respone.data.token);
    //     localStorage.setItem("user", JSON.stringify(respone.data.user));
    //     localStorage.setItem("token", respone.data.token);
    //     return true;
    //   } else {
    //     throw new Error(respone.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
    };
    const mockToken = "1234567890";

    // First set the data in localStorage
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);

    // Then update the state
    setUser(mockUser);
    setToken(mockToken);

    return true;
  };

  const signup = async (formData) => {
    // try {
    //   const respone = await axiosInstance.post(ENDPOINTS.SIGNUP, formData);
    //   if (respone.success) {
    //     setUser(respone.data.user);
    //     setToken(respone.data.token);
    //     localStorage.setItem("user", JSON.stringify(respone.data.user));
    //     localStorage.setItem("token", respone.data.token);
    //     return true;
    //   } else {
    //     throw new Error(respone.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
    };
    const mockToken = "1234567890";

    // First set the data in localStorage
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);

    // Then update the state
    setUser(mockUser);
    setToken(mockToken);

    return true;
  };

  const logout = async () => {
    // try {
    //   const respone = await axiosInstance.post(ENDPOINTS.LOGOUT);
    //   if (respone.success) {
    //     setUser(null);
    //     setToken(null);
    //     localStorage.removeItem("user");
    //     localStorage.removeItem("token");
    //     return true;
    //   } else {
    //     throw new Error(respone.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
    // First remove from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Then update state
    setUser(null);
    setToken(null);

    return true;
  };

  const getUser = async () => {
    try {
      if (token) {
        const respone = await axiosInstance.get(ENDPOINTS.GET_USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (respone.success) {
          setUser(respone.data.user);
          return true;
        } else {
          throw new Error(respone.message);
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
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
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
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
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
