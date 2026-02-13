import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import BookView from "./pages/BookView";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/book/:id/read" element={<BookView />} />
      </Routes>
    </Router>
  )
}

export default App
