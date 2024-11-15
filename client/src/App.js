import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from "./components/PrivateRoute";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Trial from './components/Trial';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
