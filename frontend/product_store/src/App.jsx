import { Button, HStack,Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <Box miniH={"100vh"} >
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>

      </Routes>
    </Box>
    </>

  );
}

export default App;
