import Image from "next/image";

export default function Header() {
  return (
    <header className="rounded  border-2  border-teal-700">
      <nav className=" w-full text-center   h-28 text-2xl  ">
        <ul className="items-center navbar-nav mr-auto lg:flex lg:flex-row justify-center space-x-4">
          <li className="nav-item pt-2">
            <Image src="/kaspa_logo.svg" alt="Kaspa Logo" width={250} height={80} />
          </li>
          <li className="nav-item">
            <a>Home</a>
          </li>
          <li className="nav-item">
            <a>Features</a>
          </li>
          <li className="nav-item">
            <a>Pricing</a>
          </li>
          <li className="nav-item">
            <a>About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
