import "./App.css";
import HomePage from "./components/HomePage";
import MainBooking from "./components/MainBooking";
import MyBookings from "./components/MyBookings";
import Login from "./components/Login";
import SignUp from "./components/SignUp";



import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-tickets" element={<MainBooking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/signup" element={<SignUp />} />
         
        </Routes>
      </BrowserRouter>
    </div>
      
  );
}

export default App;
