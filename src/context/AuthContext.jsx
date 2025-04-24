import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
  keepAliveRequest,
} from "../api/auth";
import {
  createPreference,
  datapay,
  getOrders,
  finishOrder,
  generateOrderRLaxios,
} from "../api/pay";
import { dashboardReq } from "../api/dashboard.js";

import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAutenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setisAutenticated(true);
      console.log(res);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
    }
  };

  const signin = async (user) => {
    setLoading(true);
    try {
      const res = await loginRequest(user);
      console.log(res);
      setisAutenticated(true);
      setUser(res.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async (user) => {
    setLoading(true);
    try {
      const res = await logoutRequest(user);
      setisAutenticated(false);
      setUser(null);
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  
  const getDashboardData = async () => {
    try {
      const res = await dashboardReq(user);
      return res.data.data; // ✅ así ya llega limpio a DashboardPage
    } catch (err) {
      console.error("Error cargando dashboard:", err);
      return null;
    }
  };

  const recharge = async (body) => {
    console.log(body.items);
    try {
      const response = await createPreference(body);

      const payload = {
        user: user,
        id: response.data["id"].substring(0, 10),
        products: body.items, // Asegúrate de usar el valor correcto aquí
      };
      const data = await datapay(payload);
      console.log(data);
      return response.data["id"];
    } catch (error) {
      console.error("Error in recharge:", error.message);
      // Considera cómo manejar el error aquí, por ejemplo, informando al usuario
    }
  };

  const generateOrderRL = async (body) => {
    try {
      // Verificar que el body y el ID de usuario estén presentes
      if (!user || !user.id) {
        throw new Error("User ID is required");
      }

      // Crear el payload para la solicitud
      const payload = { userId: user.id, products: body.items };

      // Llamar a la función generateOrderRLaxios con el payload
      const response = await generateOrderRLaxios(payload);

      // Devolver los datos de la respuesta
      return response.data;
    } catch (error) {
      console.error("Error finishing order:", error.message);
      // Re-lanzar el error para que el componente llamante pueda manejarlo
      throw error;
    }
  };

  const finishOrderapi = async (userId) => {
    try {
      // Validar que se haya proporcionado un userId
      if (!userId) {
        throw new Error("User ID is required");
      }

      // Crear el payload para la solicitud
      const payload = { userId };

      // Llamar a la función finishOrder con el payload
      const response = await finishOrder(payload);

      // Manejo de la respuesta HTTP
      if (response.status !== 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Devolver los datos de la respuesta
      return response.data;
    } catch (error) {
      console.error("Error finishing order:", error.message);
      // Re-lanzar el error para que el componente llamante pueda manejarlo
      throw error;
    }
  };
  const getPendingUsers = async (body) => {
    try {
      const response = await getOrders(); // Llamada a la función de solicitud para obtener usuarios pendientes
      return response.data; // Devuelve los usuarios pendientes
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);

      // Obtener el token de las cookies o localStorage
      let token = Cookies.get("token");

      try {
        // Verificar el token con el servidor
        const payload = { token: token };
        const res = await verifyTokenRequest(payload);
        if (res.data) {
          // Token válido
          setisAutenticated(true);
          console.log(res.data);
          setUser(res.data);
        } else {
          // Token no válido
          setisAutenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setisAutenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        user,
        isAuthenticated,
        errors,
        loading,
        logout,
        recharge,
        datapay,
        getPendingUsers,
        finishOrderapi,
        generateOrderRL,
        getDashboardData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
