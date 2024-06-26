import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "./Button";

const Nav = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <header className="bg-g">
      <div className="mx-auto max-w-screen-3xl px-4 sm:px-6 lg:px-6 ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12 pb-2">
            <a className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="w-40 h-12 md:w-96 "
                viewBox="0 0 389.7027027027027 60.52491445799131"
              >
                <g
                  transform="matrix(1.4780405405405403,0,0,1.4780405405405403,20,16.613809285131662)"
                  fill="#fff"
                >
                  <g xmlns="http://www.w3.org/2000/svg" display="none">
                    <rect
                      x="-182.596"
                      y="-143.699"
                      display="inline"
                      fill="#ffffff"
                      width="240.181"
                      height="241.399"
                    ></rect>
                  </g>
                  <g xmlns="http://www.w3.org/2000/svg" display="none">
                    <path
                      display="inline"
                      d="M32.005,29.713H-0.004L16,2.287L32.005,29.713z M1.738,28.713h28.524L16,4.271L1.738,28.713z    M26.667,26.671H5.334L16,8.394L26.667,26.671z M7.076,25.671h17.849L16,10.378L7.076,25.671z"
                    ></path>
                    <path
                      display="inline"
                      d="M21.696,24.091H10.304L16,14.248L21.696,24.091z M12.039,23.091h7.923L16,16.244L12.039,23.091z"
                    ></path>
                  </g>
                  <g xmlns="http://www.w3.org/2000/svg" display="none">
                    <g display="inline">
                      <polygon
                        fill="#ffffff"
                        points="15.796,7.81 27.179,27.481 4.413,27.481   "
                      ></polygon>
                    </g>
                    <g display="inline">
                      <path
                        fill="#ffffff"
                        d="M16,3.28L0.867,29.213h30.266L16,3.28z M16,9.386l9.795,16.785H6.205L16,9.386z"
                      ></path>
                      <path d="M32.005,29.713H-0.004L16,2.287L32.005,29.713z M1.738,28.713h28.524L16,4.271L1.738,28.713z M26.667,26.671H5.334    L16,8.394L26.667,26.671z M7.076,25.671h17.849L16,10.378L7.076,25.671z"></path>
                    </g>
                    <g display="inline">
                      <polygon
                        fill="#ffffff"
                        points="16,15.246 20.829,23.591 11.171,23.591   "
                      ></polygon>
                      <path d="M21.696,24.091H10.304L16,14.248L21.696,24.091z M12.039,23.091h7.923L16,16.244L12.039,23.091z"></path>
                    </g>
                  </g>
                  <g xmlns="http://www.w3.org/2000/svg" display="none">
                    <g display="inline">
                      <polygon
                        fill="#ffffff"
                        points="16,15.246 20.829,23.591 11.171,23.591   "
                      ></polygon>
                    </g>
                    <g display="inline">
                      <path
                        fill="#ffffff"
                        d="M16,2.291L0,29.709h32L16,2.291z M16,8.747l10.357,17.746H5.643L16,8.747z"
                      ></path>
                    </g>
                  </g>
                  <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <polygon points="11.171,23.591 20.829,23.591 16,15.246   "></polygon>
                      <path d="M0,29.709h32L16,2.291L0,29.709z M5.643,26.493L16,8.747l10.357,17.746H5.643z"></path>
                    </g>
                  </g>
                </g>
                <g
                  transform="matrix(1.5716650732607496,0,0,1.5716650732607496,85.11400108771596,19.884342275316328)"
                  fill="#fff"
                >
                  <path d="M2.86 18.44 l6.66 0 l0 1.56 l-7.06 0 l-1.26 0 l0 -14 l1.66 0 l6.48 0 l0 1.56 l-6.48 0 l0 4.64 l5.04 0 l0 1.52 l-5.04 0 l0 4.72 z M23.18 18.5 c-1.28 1.1 -2.9 1.7 -4.7 1.7 c-3.64 0 -7.16 -2.96 -7.16 -7.2 s3.52 -7.2 7.16 -7.2 c1.78 0 3.38 0.6 4.64 1.66 l-1.02 1.16 c-0.98 -0.78 -2.24 -1.24 -3.5 -1.24 c-2.86 0 -5.56 2.32 -5.56 5.62 s2.7 5.62 5.56 5.62 c1.28 0 2.56 -0.48 3.54 -1.28 z M31.940000000000005 5.800000000000001 c3.64 0 7.16 2.96 7.16 7.2 s-3.52 7.2 -7.16 7.2 c-3.66 0 -7.16 -2.96 -7.16 -7.2 s3.5 -7.2 7.16 -7.2 z M31.940000000000005 18.62 c2.74 0 5.44 -2.32 5.44 -5.62 s-2.7 -5.62 -5.44 -5.62 c-2.76 0 -5.44 2.32 -5.44 5.62 s2.68 5.62 5.44 5.62 z M51.480000000000004 20 l-1.8 0 l-3.54 -5.04 l-0.38 0 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 c3.14 0 4.96 1.92 4.96 4.52 c0 2 -1.08 3.56 -3 4.16 z M42.86 7.5600000000000005 l0 5.92 l2.86 0 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 z M60.14 5.800000000000001 c3.64 0 7.16 2.96 7.16 7.2 s-3.52 7.2 -7.16 7.2 c-3.66 0 -7.16 -2.96 -7.16 -7.2 s3.5 -7.2 7.16 -7.2 z M60.14 18.62 c2.74 0 5.44 -2.32 5.44 -5.62 s-2.7 -5.62 -5.44 -5.62 c-2.76 0 -5.44 2.32 -5.44 5.62 s2.68 5.62 5.44 5.62 z M77.9 6 l1.66 0 l0 8.92 c0 3.44 -2.24 5.38 -5.08 5.38 s-5.08 -1.94 -5.08 -5.38 l0 -8.92 l1.66 0 l0 8.92 c0 2.62 1.56 3.8 3.42 3.8 s3.42 -1.18 3.42 -3.8 l0 -8.92 z M91 6 l0 1.56 l-3.88 0 l0 12.44 l-1.66 0 l0 -12.44 l-3.9 0 l0 -1.56 l9.44 0 z M94.66000000000001 18.44 l6.66 0 l0 1.56 l-7.06 0 l-1.26 0 l0 -14 l1.66 0 l6.48 0 l0 1.56 l-6.48 0 l0 4.64 l5.04 0 l0 1.52 l-5.04 0 l0 4.72 z M113.98000000000002 6 c3.14 0 4.96 1.92 4.96 4.52 s-1.82 4.44 -4.96 4.44 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 z M113.94000000000001 13.48 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 l0 5.92 l2.86 0 z M122.50000000000001 18.44 l6.28 0 l0 1.56 l-7.94 0 l0 -14 l1.66 0 l0 12.44 z M142.10000000000002 20 l-1.44 -3.3 l-7.48 0 l-1.44 3.3 l-1.76 0 l6.24 -14 l1.38 0 l6.26 14 l-1.76 0 z M133.8 15.3 l6.24 0 l-3.12 -7.12 z M155.22000000000003 6 l1.66 0 l0 14 l-1.28 0 l-8.48 -10.96 l0 10.96 l-1.66 0 l0 -14 l1.28 0 l8.48 10.98 l0 -10.98 z M169.04000000000002 6 l1.66 0 l0 14 l-1.28 0 l-8.48 -10.96 l0 10.96 l-1.66 0 l0 -14 l1.28 0 l8.48 10.98 l0 -10.98 z M174.76000000000002 18.44 l6.66 0 l0 1.56 l-7.06 0 l-1.26 0 l0 -14 l1.66 0 l6.48 0 l0 1.56 l-6.48 0 l0 4.64 l5.04 0 l0 1.52 l-5.04 0 l0 4.72 z M193.79999999999998 20 l-1.8 0 l-3.54 -5.04 l-0.38 0 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 c3.14 0 4.96 1.92 4.96 4.52 c0 2 -1.08 3.56 -3 4.16 z M185.18 7.5600000000000005 l0 5.92 l2.86 0 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 z"></path>
                </g>
              </svg>
            </a>
          </div>{" "}
          <div className="md:flex md:items-center md:gap-12">
            {user ? (
              <>
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        to="/"
                      >
                        {" "}
                        Home
                      </Link>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        My Footprint{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        co2 Calculator{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        {" "}
                        Activity
                      </a>
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              ""
            )}

            <div className="flex items-center gap-4">
              <div className=" sm:gap-4 hidden md:flex">
                {user ? (
                  <>
                    <div className="text-myblack py-2.5 text-md font-medium">
                      {user?.username}
                    </div>
                    <Button onClick={logout}>Logout</Button>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="block md:hidden">
                <nav
                  onClick={() =>
                    !setIsOpen ? setIsOpen(true) : setIsOpen(false)
                  }
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </nav>
                {isOpen ? (
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gray-100 bg-opacity-90 flex items-center justify-center">
                    <div className="flex flex-col gap-6">
                      <Link to="/home">Home</Link>
                      <Link to="/myfootprint">My Footprint</Link>
                      <Link to="/co2calculator">co2 Calculator</Link>
                      <Link to="/activity">Activity</Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
