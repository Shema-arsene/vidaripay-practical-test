import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PaymentSuccess from "./pages/PaymentSuccess"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  )
}

export default App
