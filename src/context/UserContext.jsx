import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
  return theme;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      const user = { ...action.payload.user, token: action.payload.jwt };
      localStorage.setItem("user", JSON.stringify(user));
      return { ...state, user };
    }
    case "LOGOUT_USER":
      localStorage.removeItem("user");
      toast.success("logged out successfully");
      return { ...state, user: null };
    case "TOGGLE_THEME": {
      const { dracula, winter } = themes;
      const theme = state.theme === dracula ? winter : dracula;
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }
      localStorage.setItem("theme", theme);
      return { ...state, theme };
    }
    default:
      return state;
  }
};

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loginUser = (payload) => dispatch({ type: "LOGIN_USER", payload });
  const logoutUser = () => dispatch({ type: "LOGOUT_USER" });
  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <UserContext.Provider
      value={{ ...state, loginUser, logoutUser, toggleTheme }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
