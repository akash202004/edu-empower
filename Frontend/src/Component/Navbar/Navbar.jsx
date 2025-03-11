import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: true },
];

const NavLink = ({ name, path, authRequired, isSignedIn, navigate }) => (
  <button
    onClick={() => {
      if (authRequired && !isSignedIn) {
        navigate("/sign-in");
      } else {
        navigate(path);
      }
    }}
    className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200"
  >
    {name}
  </button>
);

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  // Loading state handling
  if (!isLoaded) return null;

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Brand Logo */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <h1 className="text-black text-lg font-bold hover:text-blue-500 transition-all duration-300">
                  Edu-Empower
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    {...item}
                    isSignedIn={isSignedIn}
                    navigate={navigate}
                  />
                ))}

                {/* Login/Profile Section */}
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <Menu as="div" className="relative">
                    <MenuButton
                      className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Login Menu"
                    >
                      Login
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      {[
                        { label: "Login as Student", path: "/sign-in?role=student" },
                        { label: "Login as Donor", path: "/Donar" }, // FIXED Route Path
                      ].map(({ label, path }) => (
                        <MenuItem key={label}>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(path)}
                              className={`${
                                active ? "bg-blue-100" : ""
                              } w-full text-left px-4 py-2 text-sm text-black`}
                            >
                              {label}
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-label={open ? "Close menu" : "Open menu"}
                >
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    {...item}
                    isSignedIn={isSignedIn}
                    navigate={navigate}
                  />
                ))}

                {/* Mobile Login Section */}
                {!isSignedIn && (
                  <>
                    <button
                      onClick={() => navigate("/sign-in?role=student")}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-200"
                    >
                      Login as Student
                    </button>
                    <button
                      onClick={() => navigate("/Donar")}  // FIXED Route Path
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-200"
                    >
                      Login as Donor
                    </button>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
}
