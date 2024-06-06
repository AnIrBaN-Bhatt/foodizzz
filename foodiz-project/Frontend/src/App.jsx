
// import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './screens/Home.jsx'
import Login from "./screens/Login.jsx";
import Cart from "./screens/Cart.jsx";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from "./screens/signUp.jsx";
import { CartProvider } from "./components/ContextReducer.jsx";
function App() {


  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createUser" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>

  )
}

export default App
