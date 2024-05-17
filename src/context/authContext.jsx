import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      } else {
        try {
          const response = await axios.get("http://localhost:5000/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          if (response.data.status) {
            setUser(response.data.user);
            fetchUserData();
          } else {
            logout();
          }
        } catch (error) {
          console.error("Authentication error:", error);
          logout();
        }
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser((current) => ({ ...current, ...response.data }));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    verifyUser();
  }, [navigate]); // useEffect의 의존성 배열에 navigate만 포함

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
