import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__logo">
            <Link href="/" className="nav__logo-link">
              <img
                src="/images/Logo/SingBD-logo-Final.temp.webp"
                alt="SingBD Logo"
                className="nav__logo-img"
              />
            </Link>
          </div>

          <ul className="nav__menu">
            <li className="nav__item">
              <Link href="/" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__item nav__item--dropdown">
              <Link href="/products" className="nav__link">
                Products
              </Link>
              <ul className="nav__dropdown">
                <li className="nav__dropdown-item">
                  <Link href="/products/woven-tops" className="nav__dropdown-link">
                    Woven Tops
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/woven-bottoms" className="nav__dropdown-link">
                    Woven Bottoms
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/coats-jackets" className="nav__dropdown-link">
                    Coats & Jackets
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/denim" className="nav__dropdown-link">
                    Denim
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/knitwear" className="nav__dropdown-link">
                    Knitwear
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/sweater" className="nav__dropdown-link">
                    Sweaters
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/sportswear" className="nav__dropdown-link">
                    Sportswear
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/homeware" className="nav__dropdown-link">
                    Homeware
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/handicrafts" className="nav__dropdown-link">
                    Handicrafts
                  </Link>
                </li>
                <li className="nav__dropdown-item">
                  <Link href="/products/workwear" className="nav__dropdown-link">
                    Workwear
                  </Link>
                </li>
                <li className="nav__dropdown-item nav__dropdown-item--separator">
                  <Link href="/all-products" className="nav__dropdown-link">
                    View All Products
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav__item">
              <Link href="/about" className="nav__link">
                About
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/sustainability" className="nav__link">
                Sustainability
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/contact" className="nav__link">
                Contact
              </Link>
            </li>
          </ul>

          <div className="nav__mobile-toggle">
            <span className="nav__mobile-icon"></span>
            <span className="nav__mobile-icon"></span>
            <span className="nav__mobile-icon"></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
