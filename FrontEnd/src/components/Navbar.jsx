import {
    MdAddBusiness,
    MdOutlineLocalGroceryStore,
    MdOutlineLightMode,
    MdOutlineNightlight,
  } from "react-icons/md";
  import { useState } from "react";

  
  const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
  
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    return (
      <nav className={`w-full px-8 border-b border-gray-700 py-4 ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="container mx-auto flex items-center justify-between">
          <a
            href="#"
            className="flex items-center justify-center text-2xl cursor-pointer hover:underline"
          >
            <span className="mr-2">Product Store</span>
            <MdOutlineLocalGroceryStore className="inline-block" />
          </a>
          <ul className="md:flex hidden text-xl font-semibold space-x-8">
            <a href="#">
              <button className="active:bg-gray-600">
                <MdAddBusiness className="inline-block size-8" />
              </button>
            </a>
  
            <button
              onClick={toggleTheme}
              className="active:bg-gray-600"
            >
              {isDarkMode ? (
                <MdOutlineLightMode className="inline-block size-8" />
              ) : (
                <MdOutlineNightlight className="inline-block size-8" />
              )}
            </button>
          </ul>
          <div className="md:hidden">
            <a className="text-4xl font-semibold" href="#">
              &#8801;
            </a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  