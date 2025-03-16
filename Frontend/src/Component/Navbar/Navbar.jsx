import { useEffect } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donar", authRequired: true },
];

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
          const response = await fetch(`http://localhost:3000/api/users/registerorupdate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
              role: user.publicMetadata.role || "STUDENT", // Default role
            }),
          });

          if (!response.ok) throw new Error("Failed to sync user data");

          const userData = await response.json();
          
          // Redirect based on role
          if (window.location.pathname === "/") {
            navigate(userData.role === "organization" ? "/organization" : "/student");
          }
        } catch (error) {
          console.error("Error syncing user data:", error);
        }
      }
    };

    syncUserWithBackend();
  }, [isSignedIn, user, navigate]);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between sm:justify-center">
              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none">
                  <Bars3Icon aria-hidden="true" className={`${open ? "hidden" : "block"} size-6`} />
                  <XMarkIcon aria-hidden="true" className={`${open ? "block" : "hidden"} size-6`} />
                </DisclosureButton>
              </div>

              {/* Logo - Centered on Mobile */}
              <div className="flex items-center justify-center w-full sm:w-auto">
                <button onClick={() => navigate("/")} className="text-black text-lg font-bold transition-all duration-300 hover:text-blue-600">
                  Edu-Empower
                </button>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden sm:flex sm:items-center sm:ml-auto">
                <div className="flex space-x-4">
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
                      className="rounded-md px-3 py-2 text-sm font-medium text-black transition-all duration-300 hover:text-blue-600 hover:bg-gray-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Auth Section */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 w-full text-left")}
                          >
                            Login as Student
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/donar")}
                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 w-full text-left")}
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

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden">
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
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-black transition-all duration-300 hover:text-blue-600 hover:bg-gray-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
