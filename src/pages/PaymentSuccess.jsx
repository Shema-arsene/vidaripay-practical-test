import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import HeroImg from "../assets/images/hero-image.png"
import BackToTop from "../components/BackToTop"

const PaymentSuccess = () => {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen w-full">
      <header className="relative w-full h-[600px] overflow-hidden">
        <img
          src={HeroImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <Header />
        <div className="w-full h-full flex flex-col items-start justify-center p-10 md:pl-20 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">
            VidaryPay payment form
          </h1>
          <p className="text-xl font-semibold my-7">
            A Bridge Where Services Meet: Digital Access Across Africa!
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-3">
            <li>Purchase Airtime from anywhere around the world!</li>
            <li>Purchase a giftcard for your loved ones</li>
            <li>
              Make a one off payment from anywhere around the world without
            </li>
          </ul>

          <button
            className="max-w-[250px] bg-[#32c770] text-white font-semibold border-2 border-[#32c770] py-2 px-4 my-7 rounded 
          hover:bg-transparent hover:text-[#32c770] duration-300 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </header>

      <section className="min-h-[500px] flex items-center justify-center p-5">
        <div className="w-full max-w-md text-center m-auto py-10 px-5 rounded-xl shadow space-y-4">
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

      {/* Back to top component */}
      <BackToTop />
    </section>
  )
}
export default PaymentSuccess
