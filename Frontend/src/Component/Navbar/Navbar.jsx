import { useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && window.location.pathname === "/sign-in") {
      navigate("/"); // ✅ Redirect to home instead of /student
    }
  }, [isSignedIn, navigate]);
  

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              {/* Edu-Empower (Left Side) */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <h1
                  className="text-black text-lg font-bold hover:text-blue-500 transition-all duration-300"
                >
                  Edu-Empower
                </h1>
              </div>

              {/* Navigation Links + Profile (Right Side) */}
              <div className="flex items-center space-x-4">
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
                    className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200"
                  >
                    {item.name}
                  </button>
                ))}

                {/* Login/Profile */}
                <SignedOut>
                  <button
                    onClick={() => navigate("/sign-in")}
                    className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Login
                  </button>
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
