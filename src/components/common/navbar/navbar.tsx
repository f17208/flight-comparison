import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { HamburgerIcon } from '../icons';

const customNavbarLinkClasses = `
  block
  rounded
  py-2 pr-4 pl-3 md:p-0
  text-white md:text-white md:hover:text-primary
  bg-secondary md:bg-transparent
`;

export interface NavbarProps { }

export const Navbar: FC<NavbarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { width } = useWindowSize();

  // closes mobile menu if window is resized
  // this is to avoid that the mobile menu is kept open even when not visible
  useEffect(() => {
    setIsExpanded(false);
  }, [width, setIsExpanded]);

  return (
    <nav
      className="
        bg-gray-800
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
          <HamburgerIcon className="h-6 fill-gray-300" />
        </button>
        <div className={`w-full md:block md:w-auto ${!isExpanded ? 'hidden' : ''}`}>
          <ul
            className="
              flex flex-col md:flex-row md:space-x-8
              mt-4 md:mt-0
              md:text-sm md:font-medium
            "
          >
            <li>
              <Link to="airports" className={customNavbarLinkClasses}>
                Airports
              </Link>
            </li>
            {/* <li>
              <Link to="airlines" className={customNavbarLinkClasses}>
                Airlines
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
