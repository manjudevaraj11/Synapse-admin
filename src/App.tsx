import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { checkAuth } from "./features/auth/checkAuth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";
// import './App.css'

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return <AppRouter />;
}

export default App;
