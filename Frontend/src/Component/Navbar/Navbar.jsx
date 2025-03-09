import { useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding" },
  { name: "Scholarship", path: "/Scholarship" },
  { name: "Donation", path: "/donation" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loginType = localStorage.getItem("loginType");
    if (isSignedIn && loginType) {
      navigate(loginType === "student" ? "/student" : "/organization");
    }
  }, [isSignedIn, navigate]);

  const handleLogin = (type) => localStorage.setItem("loginType", type);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo & Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <h1 className="text-black text-lg font-bold">Edu-Empower</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={classNames(
                      "rounded-md px-3 py-2 text-sm font-medium",
                      item.current
                        ? "bg-gray-100 text-black"
                        : "text-black hover:bg-gray-200"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
            <SignedOut>
              <div className="flex space-x-3">
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/student"
                  onClick={() => handleLogin("student")}
                >
                  <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Login as Student
                  </button>
                </SignInButton>

                <SignInButton
                  mode="modal"
                  afterSignInUrl="/organization"
                  onClick={() => handleLogin("organization")}
                >
                  <button className="bg-green-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Login as Organization
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              className={classNames(
                "block rounded-md px-3 py-2 text-base font-medium",
                item.current
                  ? "bg-gray-100 text-black"
                  : "text-black hover:bg-gray-200"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
