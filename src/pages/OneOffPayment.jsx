import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  maxLength,
}) => (
  <div className="w-full">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

const OneOffPayment = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    currency: "RWF",
    amount: 1000,
  })
  const [errors, setErrors] = useState({})

  const currencySymbols = {
    RWF: "RWF",
    NGN: "₦",
  }

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : ""
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Enter a valid email"
      case "cardNumber":
        return /^\d{16}$/.test(value.replace(/\s/g, ""))
          ? ""
          : "Enter a valid 16-digit card number"
      case "expiry":
        return /^\d{2}\/\d{2}$/.test(value)
          ? ""
          : "Enter expiry date in MM/YY format"
      case "cvv":
        return /^\d{3,4}$/.test(value) ? "" : "Enter a valid CVV"
      case "currency":
        return ["RWF", "NGN"].includes(value) ? "" : "Select a valid currency"
      case "amount":
        return isNaN(value) || Number(value) <= 0 ? "Enter a valid amount" : ""
      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    const error = validateField(name, value)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    for (const field in formData) {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Payment submitted:", formData)
      alert("Payment submitted successfully!")
      setFormData({
        name: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        currency: "RWF",
        amount: "",
      })
      //   navigate("/success")
    }
  }

  return (
    <main>
      <section className="max-w-md mx-auto p-5">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-xl shadow space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-[#32c770]">
            One-Time Payment
          </h2>

          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Name"
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            type="email"
            placeholder="you@example.com"
          />

          <InputField
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />

          <div className="flex gap-2">
            <InputField
              label="Expiry (MM/YY)"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              error={errors.expiry}
              placeholder="MM/YY"
            />
            <InputField
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              error={errors.cvv}
              placeholder="123"
              maxLength={4}
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-medium">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full min-w-[220px] border border-gray-300 rounded px-3 py-2 focus:outline-none 
                            focus:ring-2 focus:ring-[#32c770]"
            >
              <option value="RWF">RWF (Rwandan Francs)</option>
              <option value="NGN">₦ (Naira)</option>
            </select>
          </div>

          <InputField
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            type="number"
            placeholder="Amount"
          />

          <button
            type="submit"
            className="w-full bg-[#32c770] text-white font-semibold border-2 border-[#32c770] py-2 px-4 rounded 
                        hover:bg-transparent hover:text-[#32c770] duration-300 cursor-pointer"
          >
            Make{" "}
            {formData.amount &&
              `${currencySymbols[formData.currency] || ""}${
                formData.amount
              }`}{" "}
            Payment
          </button>
        </form>
      </section>
    </main>
  )
}

export default OneOffPayment
