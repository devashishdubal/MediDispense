import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/users/login", {
          method: 'POST',  // HTTP method
          headers: {
              'Content-Type': 'application/json',
              Accept: "application/json", 
              
          },
          body: data,
          credentials: 'include',  // Send cookies with the request (same as withCredentials in axios)
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
        console.error(err);
    }
  };
  const registerAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/users/register", {
          method: 'POST',  // HTTP method
          headers: {
              'Content-Type': 'application/json',
              Accept: "application/json", 
          },
          body: data,
          credentials: 'include',  // Send cookies with the request (same as withCredentials in axios)
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
        console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user,registerAction, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
  };
  