import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md overflow-hidden">
      <div className="flex justify-between items-center max-w-6xl p-4 mx-auto sm:px-10 gap-2">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl">
            <span className="text-slate-500">Regal</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 py-2 px-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4 font-medium">
          <Link to="/">
            <li className="hidden md:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden md:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/signin">
            <li className=" text-slate-700 hover:underline text-center">
              Login
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
