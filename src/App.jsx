import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventDetails from "./pages/EventDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuth();

  return (
    <div className="  ">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />

          <Route
            path="/events/:eventId"
            element={user ? <EventDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
