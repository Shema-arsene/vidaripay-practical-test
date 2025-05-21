import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import HeroImg from "../assets/images/hero-image.png"

const PaymentSuccess = () => {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen w-full">
      <header className="relative w-full h-[500px] overflow-hidden">
        <img
          src={HeroImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <Header />
      </header>

      <section className="flex items-center justify-center p-5">
        <div className="w-full max-w-md text-center m-auto p-5 rounded-xl shadow space-y-4">
          <h1 className="text-center text-[#32c770] text-6xl mb-4">✓</h1>
          <h1 className="text-3xl font-semibold mb-2">Purchase Successful</h1>
          <p className="text-gray-600 mb-6">
            Your purchase of was processed successfully!
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full max-w-[250px] bg-[#32c770] text-white font-semibold border-2 border-[#32c770] py-2 px-4 rounded 
          hover:bg-transparent hover:text-[#32c770] duration-300 cursor-pointer"
          >
            Make another purchase
          </button>
        </div>
      </section>
    </section>
  )
}
export default PaymentSuccess
