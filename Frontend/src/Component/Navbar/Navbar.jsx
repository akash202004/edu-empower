import { useEffect } from "react";
import {
  SignInButton,
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

export default function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && window.location.pathname === "/sign-in") {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Mobile Menu Button (Left) */}
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Edu-Empower (Center in Mobile View) */}
              <div
                className="flex-grow text-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <h1 className="text-black text-lg font-bold hover:text-blue-500 transition-all duration-300">
                  Edu-Empower
                </h1>
              </div>

              {/* Login Button (Right in Mobile View) */}
              <div className="flex items-center">
                <SignedOut>
                  <Menu as="div" className="relative">
                    <MenuButton className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                      Login
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/sign-in?role=student")}
                            className={`${
                              active ? "bg-blue-100" : ""
                            } w-full text-left px-4 py-2 text-sm text-black`}
                          >
                            Login as Student
                          </button>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/Donar")}
                            className={`${
                              active ? "bg-blue-100" : ""
                            } w-full text-left px-4 py-2 text-sm text-black`}
                          >
                            Login as Donor
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>

          
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.authRequired && !isSignedIn) {
                      navigate("/sign-in");
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
