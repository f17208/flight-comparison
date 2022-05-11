import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { HamburgerIcon } from '../icons/icons';

const customNavbarLinkClasses = `
  block
  rounded
  py-2 pr-4 pl-3 md:p-0
  text-white md:text-white md:hover:text-primary font-bold
  bg-secondary md:bg-transparent
`;

export interface NavbarProps { }

export const Navbar: FC<NavbarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();

  const { width } = useWindowSize();

  // closes mobile menu when window is resized and when pathname changes
  // this is to avoid that the mobile menu is kept open even when not visible
  // or after clicking a link
  useEffect(() => {
    setIsExpanded(false);
  }, [width, pathname, setIsExpanded]);

  return (
    <nav
      className="
        bg-neutral
        border-gray-200 px-2 sm:px-4 py-2.5
      "
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Flight Comparison
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setIsExpanded(value => !value)}
          className="
            inline-flex items-center
            p-2 ml-3
            text-sm text-gray-500
            hover:bg-gray-200
            rounded-lg
            md:hidden
          "
        >
          <HamburgerIcon className="h-6 fill-gray-500" />
        </button>
        <div className={`w-full md:block md:w-auto ${!isExpanded ? 'hidden' : ''}`}>
          <ul
            className="
              flex flex-col md:flex-row items-center
              md:space-x-8 space-y-1 md:space-y-0
              mt-4 md:mt-0
              md:text-sm md:font-medium
            "
          >
            <li className="w-full">
              <Link to="airports" className={customNavbarLinkClasses}>
                Airports
              </Link>
            </li>
            <li className="w-full">
              <Link to="airlines" className={customNavbarLinkClasses}>
                Airlines
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
