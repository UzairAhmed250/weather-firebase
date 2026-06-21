import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/aboutus", label: "About" },
  { to: "/contactus", label: "Contact" },
];

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={menuRef}
      className="relative z-50 bg-[#444444] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)]"
    >
      <div className="flex min-h-[64px] items-center justify-between gap-2 px-3 py-2 sm:min-h-[80px] sm:gap-4 sm:px-6 sm:py-0 md:px-10">
        <Link to="/" className="flex shrink-0 items-center" onClick={closeMenu}>
          <img
            src="/wethr-ai-logo.png"
            alt="Wethr.ai"
            className="h-9 w-auto object-contain sm:h-12 md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-white sm:flex md:gap-8 md:text-base">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}>
              <span className="cursor-pointer whitespace-nowrap rounded-md px-2 py-1 hover:bg-[#E7E7E7] hover:text-black">
                {label}
              </span>
            </Link>
          ))}
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer whitespace-nowrap rounded-md bg-[#59bb18] px-3 py-1 font-semibold hover:opacity-90"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer whitespace-nowrap rounded-md bg-[#59bb18] px-3 py-1 font-semibold hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer whitespace-nowrap rounded-md bg-[#59bb18] px-2 py-1 text-xs font-semibold hover:opacity-90"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer whitespace-nowrap rounded-md bg-[#59bb18] px-2 py-1 text-xs font-semibold hover:opacity-90"
            >
              Sign In
            </Link>
          )}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-xl text-white hover:bg-[#555555]"
          >
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-[#555555] px-3 py-3 sm:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-white hover:bg-[#555555]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default MainHeader;
