import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/Homepage"
import PaymentSuccess from "./pages/PaymentSuccess"

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
