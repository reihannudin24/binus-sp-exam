import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import AdminBooks from "./pages/AdminBooks";
import BookView from "./pages/BookView";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:slug" element={<BookDetail />} />
          <Route path="/book/:slug/read" element={<BookView />} />
          <Route path="/admin" element={<AdminBooks />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
