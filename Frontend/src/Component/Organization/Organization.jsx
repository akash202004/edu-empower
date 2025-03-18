import { useEffect } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // Sync Clerk user data with the backend
  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isSignedIn && user) {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/users/registerorupdate",
            {
              userId: user.id,
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress || null,
              role: user.publicMetadata.role || "STUDENT",
            }
          );

          console.log("User synced:", data);

          // Redirect based on role
          if (window.location.pathname === "/") {
            navigate(data.role === "organization" ? "/organization" : "/student");
          }
        } catch (error) {
          console.error("Error syncing user data:", error.response?.data || error.message);
        }
      }
    };

    syncUserWithBackend();
  }, [isSignedIn, user, navigate]);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/")}
                  className="text-black text-lg font-bold transition-all duration-300 hover:text-blue-600"
                >
                  Edu-Empower
                </button>
              </div>

              {/* User Auth Section */}
              <div className="flex items-center ml-auto">
                <SignedOut>
                  <Menu as="div" className="relative">
                    <MenuButton className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white-500">
                      Login
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border rounded-md shadow-lg focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/student")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Login as Student
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/donor")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Login as Donor
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/organization")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Login as Organization
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
        </>
      )}
    </Disclosure>
  );
}
