import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
// headless ui
import { Listbox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import NetflixIcon from "../assets/images/Netflix.jpg"
import AmazonIcon from "../assets/images/Amazon-logo.png.jpg"
import FacebookIcon from "../assets/images/Facebook-logo.png"

const GiftCard = () => {
  // d86411
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    currency: "RWF",
    provider: "Amazon",
    phone: "",
    amount: 1000,
  })

  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : ""
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Enter a valid email"
      case "cardNumber":
        return /^\d{16}$/.test(value)
          ? ""
          : "Enter a valid 16-digit card number"
      case "expiry":
        return /^\d{2}\/\d{2}$/.test(value)
          ? ""
          : "Enter expiry date in MM/YY format"
      case "cvv":
        return /^\d{3,4}$/.test(value) ? "" : "Enter a valid CVV"
      case "country":
        return value.trim() === "" ? "Country is required" : ""
      case "provider":
        return value.trim() === "" ? "Provider is required" : ""
      case "phone":
        return /^\+?\d{9,15}$/.test(value) ? "" : "Enter a valid phone number"
      case "currency":
        return value.trim() === "" ? "Currency is required" : ""
      case "amount":
        return isNaN(value) || Number(value) <= 0 ? "Enter a valid amount" : ""
      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      provider: "",
      [name]: value,
    }))

    // Validate the field on change
    const error = validateField(name, value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  const handlePayment = (e) => {
    e.preventDefault()

    const newErrors = {}
    for (const field in formData) {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData)
      // Reset form
      setFormData({
        name: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        country: "Rwf",
        provider: "Netflix",
        amount: "",
      })
    }

    console.log(formData)
    navigate("/success")
  }

  return (
    <main>
      <section className="max-w-md mx-auto p-5">
        <form
          onSubmit={handlePayment}
          className="p-6 bg-white rounded-xl shadow space-y-4"
        >
          <h2 className="text-2xl font-archivo font-bold text-center text-[#32c770]">
            Purchase GiftCard
          </h2>
          {/* Sender's Name */}
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Recepient's name */}
          <div>
            <label className="block mb-1 font-medium">Recipient's Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="Recipient's name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Recipient's Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Card Number */}
          <div>
            <label className="block mb-1 font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>
          {/* Expirery and CVV */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Expiry (MM/YY)</label>
              <input
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
                placeholder="MM/YY"
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">CVV</label>
              <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* GiftCard provider */}
          <div className="mb-4">
            <p>Choose card:</p>
            <div className="flex gap-5 items-center my-3 pl-2">
              {["Netflix", "Amazon", "Facebook"].map((type) => (
                <label key={type} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="provider"
                    value={type}
                    className="accent-[#32c770]"
                    checked={formData.provider === type}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </div>
            <div className="flex items-center justify-evenly gap-10 mt-10">
              <img
                src={NetflixIcon}
                alt="netflix"
                className={`w-[50px] h-[50px] cursor-pointer rounded ${
                  formData.provider === "Netflix"
                    ? "border border-[#32c770]"
                    : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, provider: "Netflix" })
                }
              />
              <img
                src={AmazonIcon}
                alt="amazon"
                className={`w-[50px] h-[50px] cursor-pointer rounded ${
                  formData.provider === "Amazon"
                    ? "border border-[#32c770]"
                    : ""
                }`}
                onClick={() => setFormData({ ...formData, provider: "Amazon" })}
              />
              <img
                src={FacebookIcon}
                alt="facebook"
                className={`w-[50px] h-[50px] cursor-pointer rounded ${
                  formData.provider === "Facebook"
                    ? "border border-[#32c770]"
                    : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, provider: "Facebook" })
                }
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="780 123 456"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block mb-1 font-medium">Currency</label>
            <Listbox
              value={formData.currency}
              onChange={(value) =>
                handleChange({ target: { name: "currency", value } })
              }
            >
              <div className="relative mt-1">
                <Listbox.Button
                  className="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left border border-gray-300 
                                                      focus:outline-none focus:ring-2 focus:ring-[#32c770]"
                >
                  <span className="block truncate">{formData.currency}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg 
                                                      ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  {["RWF", "₦"].map((currency) => (
                    <Listbox.Option
                      key={currency}
                      value={currency}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-[#32c770] text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {currency}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="Amount"
              min="0"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#32c770] text-white font-semibold border-2 border-[#32c770] py-2 px-4 rounded hover:bg-transparent hover:text-[#32c770] duration-300 cursor-pointer"
          >
            Purchase{" "}
            {formData.amount && `${formData.currency} ${formData.amount}`}{" "}
            GiftCard
          </button>
        </form>
      </section>
    </main>
  )
}
export default GiftCard
