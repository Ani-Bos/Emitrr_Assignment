import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Upload from "./Components/Upload/Upload";
import Test from "./Components/Test/Test";
import Problems from "./Components/Problems/Problems";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/problems" element={<Problems />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
