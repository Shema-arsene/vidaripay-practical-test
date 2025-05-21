import { useEffect, useState } from "react"
import Logo from "../assets/logo/high-res/logo-transparent.png"
import { FaBars } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#365B5C]/70 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Vidarypay" width={150} />
        </div>

        {/* Mobile Menu Icon */}
        <FaBars
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`text-3xl text-white cursor-pointer md:hidden hover:text-[#32c770] transition-all duration-300 ${
            isMenuOpen ? "hidden" : "block"
          }`}
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 text-white text-sm sm:text-base">
          <a
            href="#"
            className="hover:text-[#32c770] transition-all duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-[#32c770] transition-all duration-300"
          >
            Payment Center
          </a>
          <a
            href="#"
            className="hover:text-[#32c770] transition-all duration-300"
          >
            Exchange Rate
          </a>
          <a
            href="#"
            className="hover:text-[#32c770] transition-all duration-300"
          >
            Live Support 24/7
          </a>
          <a
            href="#"
            className="hover:text-[#32c770] transition-all duration-300"
          >
            About Us
          </a>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 right-0 h-screen w-[80%] max-w-xs bg-black/60 text-white duration-1000 z-40
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <IoClose
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-4xl cursor-pointer hover:text-[#32c770] transition duration-300"
          />

          <nav className="flex flex-col mt-24 pl-6 text-lg font-medium">
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#32c770] py-2"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#32c770] py-2"
            >
              Payment Center
            </a>
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#32c770] py-2"
            >
              Exchange Rate
            </a>
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#32c770] py-2"
            >
              Live Support 24/7
            </a>
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#32c770] py-2"
            >
              About Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
