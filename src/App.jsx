import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import MyRentals from "./pages/MyRentals";
import AdminBooks from "./pages/AdminBooks";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:slug" element={<BookDetail />} />
          <Route path="/my-rentals" element={<MyRentals />} />
          <Route path="/admin" element={<AdminBooks />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
