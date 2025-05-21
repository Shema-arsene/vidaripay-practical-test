import React, { useState } from "react"
import Header from "../components/Header"
import HeroImg from "../assets/images/hero-image.png"
import { useNavigate } from "react-router-dom"
import AirtimePayment from "./AirtimePayment"
import GiftCard from "./GiftCard"
import OneOffPayment from "./OneOffPayment"
import BackToTop from "../components/BackToTop"

const HomePage = () => {
  const navigate = useNavigate()
  const [payment, setPayment] = useState("AirTime")

  return (
    <main>
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
        </div>
      </header>

      <div className="my-10 w-full max-w-[800px] mx-auto flex flex-wrap gap-2 items-center justify-center px-5">
        {[
          { label: "Buy Airtime", value: "AirTime" },
          { label: "GiftCard", value: "GiftCard" },
          { label: "One-Off payment", value: "OneoffPayment" },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={`flex-1 min-w-[150px] px-4 py-3 text-sm sm:text-base rounded-lg border duration-300 text-center
        ${
          payment === value
            ? "bg-[#32c770] text-white border-[#32c770]"
            : "bg-transparent text-[#32c770] border-[#32c770] hover:bg-[#32c770] hover:text-white"
        }`}
            onClick={() => setPayment(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Airtime Purchase */}
      {payment === "AirTime" && <AirtimePayment />}

      {/* GiftCard Purchase */}
      {payment === "GiftCard" && <GiftCard />}

      {/* GiftCard Purchase */}
      {payment === "OneoffPayment" && <OneOffPayment />}

      <p className="p-5 max-w-md block mx-auto text-gray-400/70 text-sm text-center">
        Your personal data will be used to process your payment, verify your
        identity, and ensure secure transactions. We may also use your data to
        improve your experience and as outlined in our privacy policy.
      </p>

      <BackToTop />
    </main>
  )
}

export default HomePage
