import React, { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"
import { animateScroll as scroll } from "react-scroll"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300) // Show button after scrolling 300px
    }

    window.addEventListener("scroll", toggleVisibility)

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (!isVisible) return null // Don't render the button if not visible

  return (
    <button
      onClick={() => scroll.scrollToTop()}
      className="w-10 h-10 fixed bottom-7 right-7 flex items-center justify-center border-2 border-[#32c770] rounded-md 
      bg-[#32c770] text-white hover:bg-transparent hover:text-[#32c770] duration-300 cursor-pointer"
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  )
}

export default BackToTop
