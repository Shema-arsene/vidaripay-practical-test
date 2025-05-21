import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
// headless ui
import { Listbox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

const AirtimePayment = () => {
  // d86411
  const navigate = useNavigate()

  const [currency, setCurrency] = useState("RWF")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "Rwanda",
    provider: "",
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
      alert("Payment submitted successfully!")
      // Reset form
      setFormData({
        name: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        country: "",
        provider: "",
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
            Buy Airtime
          </h2>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
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
          <div className="flex gap-4">
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

          {/* Country */}
          <Listbox
            value={formData.country}
            onChange={(value) =>
              handleChange({ target: { name: "country", value } })
            }
          >
            <div className="relative mt-1">
              <Listbox.Button
                className="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left border border-gray-300 
                                            focus:outline-none focus:ring-2 focus:ring-[#32c770]"
              >
                <span className="block truncate">{formData.country}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg 
                                            ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                {["Rwanda", "Nigeria"].map((country) => (
                  <Listbox.Option
                    key={country}
                    value={country}
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
                          {country}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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

          {/* Provider */}
          {formData.country === "Rwanda" && (
            <div>
              <label className="block mb-1 font-medium">
                Rwanda Service Provider
              </label>
              <Listbox
                value={formData.provider}
                onChange={(value) => {
                  handleChange({ target: { name: "provider", value } })
                  if (value === "MTN Rwanda") setCurrency("RWF")
                  else if (value === "Airtel Rwanda") setCurrency("RWF")
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32c770]">
                    <span className="block truncate">
                      {formData.provider || "Select Provider"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-[#32c770] ring-opacity-5 focus:outline-none z-10">
                    {["MTN Rwanda", "Airtel Rwanda"].map((provider) => (
                      <Listbox.Option
                        key={provider}
                        value={provider}
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
                              {provider}
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
            </div>
          )}

          {formData.country === "Nigeria" && (
            <div>
              <label className="block mb-1 font-medium">
                Nigeria Service Provider
              </label>
              <Listbox
                value={formData.provider}
                onChange={(value) => {
                  handleChange({ target: { name: "provider", value } })
                  if (value === "MTN Nigeria") setCurrency("₦")
                  else if (value === "Airtel Nigeria") setCurrency("₦")
                  else if (value === "Globacom") setCurrency("₦")
                  else if (value === "9 Mobile") setCurrency("₦")
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32c770]">
                    <span className="block truncate">
                      {formData.provider || "Select Provider"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-[#32c770] ring-opacity-5 focus:outline-none z-10">
                    {[
                      "MTN Nigeria",
                      "Airtel Nigeria",
                      "Globacom",
                      "9mobile",
                    ].map((provider) => (
                      <Listbox.Option
                        key={provider}
                        value={provider}
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
                              {provider}
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
            </div>
          )}
          {errors.provider && (
            <p className="text-red-500 text-sm mt-1">{errors.provider}</p>
          )}

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
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#32c770] text-white font-semibold border-2 border-[#32c770] py-2 px-4 rounded 
                        hover:bg-transparent hover:text-[#32c770] duration-300 cursor-pointer"
          >
            Make {formData.amount && `${currency} ${formData.amount}`} Purchase
          </button>
        </form>
      </section>
    </main>
  )
}

export default AirtimePayment
