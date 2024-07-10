import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
