import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 py-6 px-2">
      <nav
        className="
      container 
      mx-auto flex justify-between
      flex-col
      md:flex-row
      "
      >
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">SW Test</Link>
        </span>
        <span className="hidden md:flex space-x-2">
          {isLoggedIn ? (
            <>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>

        {/* // for small screens */}
        <span className="flex md:hidden space-x-2 justify-end">
          {isLoggedIn ? (
            <>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>
      </nav>
    </header>
  );
};

export default Header;
