import { Routes, Route, Navigate} from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import About from "./pages/About"

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  if (isAuthenticated){
    return element
  }
  else {
    localStorage.setItem('logoutRedirect', window.location.pathname);
    return <Navigate to="/signin" replace />
  }
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={ <SignIn/> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/" element={<PrivateRoute element={<Home />} />}/>
        <Route path="/about" element={<PrivateRoute element={<About />} />}/>
      </Routes>
    </div>
  )
}

export default App
