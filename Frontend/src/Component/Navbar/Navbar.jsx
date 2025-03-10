import { useEffect, useState } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn && window.location.pathname === "/") {
      navigate("/student");
    }
  }, [isSignedIn, navigate]);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none">
                  <Bars3Icon aria-hidden="true" className={`${open ? "hidden" : "block"} size-6`} />
                  <XMarkIcon aria-hidden="true" className={`${open ? "block" : "hidden"} size-6`} />
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center cursor-pointer" onClick={() => navigate("/")}> 
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-2">
                    <span className="text-sm">E</span>
                  </div>
                  <span className="text-black text-lg font-bold">Edu-Empower</span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
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
                        className={classNames("rounded-md px-3 py-2 text-sm font-medium", "text-black hover:bg-gray-200")}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <SignedOut>
                  <button
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  {isLoginOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                      <SignInButton mode="modal" redirectUrl="/student">
                        <button className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200">
                          Login as Student
                        </button>
                      </SignInButton>
                      <SignInButton mode="modal" redirectUrl="/student">
                        <button className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200">
                          Login as Organization
                        </button>
                      </SignInButton>
                    </div>
                  )}
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>

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
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-200"
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