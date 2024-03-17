import { Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/containers/default/DefaultLayout"
import Login from "./components/account/Login"
import Register from "./components/account/Register"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
