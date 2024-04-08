import "./App.css";
import Login from "./component/login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Register from "./component/register";
import Home from "./component/Home";
import PlayMusic from "./component/Play";
import Home1 from "./component/home1";

import List from "./component/List";
import HomeListMusic from "./component/home-content/HomeListmusic";
import IconMusic from "./component/home-content/IconMusic";
import ListALL from "./component/home-content/ListAllmusic";
import DetaiAbum from "./component/DetailAbum";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeListMusic />} />
            {/* <Route path="/homelistmusic" element={<HomeListMusic />} /> */}
            <Route path="homelistmusic" element={<HomeListMusic />}>
              <Route path="all" element={<ListALL />} />
            </Route>
            <Route path="/detailabum" element={<DetaiAbum />} />
            <Route path="/home1" element={<Home1 />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
