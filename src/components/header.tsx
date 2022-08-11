import React from 'react';

function Header() {
  return (
    <div id="header" className="fixed w-full z-30 top-0 text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <a
          className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="https://blswallet.org/"
        >
          BURNER BLS
        </a>
        <p className="inline-block py-2 px-4 text-black font-bold no-underline">Network: localhost</p>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </div>
  );
}

export default Header;
