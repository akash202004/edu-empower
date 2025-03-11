import { useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Disclosure } from "@headlessui/react";
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo */}
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate("/sign-in?role=student")}
                      className="bg-green-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-600"
                    >
                      Login as Student
                    </button>

                    <button
                      onClick={() => navigate("/sign-in?role=donor")}
                      className="bg-red-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-red-600"
                    >
                      Login as Donor
                    </button>
                  </div>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>

              {/* Mobile Menu Button */}
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
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

              {/* Mobile Login Options */}
              <SignedOut>
                <div className="space-y-2 pt-3">
                  <button
                    onClick={() => navigate("/sign-in?role=student")}
                    className="block w-full text-center bg-green-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-600"
                  >
                    Login as Student
                  </button>

                  <button
                    onClick={() => navigate("/sign-in?role=donor")}
                    className="block w-full text-center bg-red-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-red-600"
                  >
                    Login as Donor
                  </button>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="pt-3">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
