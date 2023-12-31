import React from "react";
import { useStateContext } from "../../context";
import Link from "next/link";
const Header = () => {
  const { userBlance, disconnect, address, contract, connect } =
    useStateContext();
  return (
    <>
      <header class="rn-header haeder-default header--sticky">
        <div class="container">
          <div class="header-inner">
            <div class="header-left">
              <div class="logo-thumbnail logo-custom-css">
                <Link class="logo-light" href="/">
                  <img src="/logo/ll.png" alt="nft-logo" />
                </Link>
                <Link class="logo-dark" href="/">
                  <img src="/logo/logo-dark.png" alt="nft-logo" />
                </Link>
              </div>
              <div class="mainmenu-wrapper">
                <nav id="sideNav" class="mainmenu-nav d-none d-xl-block">
                  <ul class="mainmenu">
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="#">Explore</Link>
                      <ul class="submenu">
                        <li>
                          <Link href="/active">
                            Activity<i class="feather-fast-forward"></i>
                          </Link>
                        </li>
                        {address && (
                          <li>
                            <Link href="/author">
                              Author<i class="feather-fast-forward"></i>
                            </Link>
                          </li>
                        )}
                        {address && (
                          <li>
                            <Link href="/create">
                              Create
                              <i class="feather-fast-forward"></i>
                            </Link>
                          </li>
                        )}

                        <li>
                          <Link href="/creator">
                            Creator
                            <i class="feather-fast-forward"></i>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="#">Pages</Link>
                      <ul class="submenu">
                        <li>
                          <Link href="/privacy">
                            Privacy<i class="feather-fast-forward"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/404">
                            404
                            <i class="feather-fast-forward"></i>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div class="header-right">
              {/* <div class="setting-option d-none d-lg-block">
                <form class="search-form-wrapper" action="#">
                  <input
                    type="search"
                    placeholder="Search Here"
                    aria-label="Search"
                  />
                  <div class="search-icon">
                    <button>
                      <i class="feather-search"></i>
                    </button>
                  </div>
                </form>
              </div> */}
              {/* <div class="setting-option rn-icon-list d-block d-lg-none">
                <div class="icon-box search-mobile-icon">
                  <button>
                    <i class="feather-search"></i>
                  </button>
                </div>
                <form
                  id="header-search-1"
                  action="#"
                  method="GET"
                  class="large-mobile-blog-search"
                >
                  <div class="rn-search-mobile form-group">
                    <button type="submit" class="search-button">
                      <i class="feather-search"></i>
                    </button>
                    <input type="text" placeholder="Search ..." />
                  </div>
                </form>
              </div> */}

              {/* connect wallet */}

              {address ? (
                ""
              ) : (
                <div
                  class="setting-option header-btn rbt-site-header"
                  id="rbt-site-header"
                >
                  <div class="icon-box">
                    <button
                      onClick={() => connect()}
                      class="btn btn-primary-alta btn-small"
                    >
                      Wallet connect
                    </button>
                  </div>
                </div>
              )}

              {/* END connect wallet */}
              {/* <div class="setting-option rn-icon-list notification-badge">
                <div class="icon-box">
                  <Link href="#">
                    <i class="feather-bell"></i>
                  </Link>
                </div>
              </div> */}

              {address ? (
                <div>
                  <div class="setting-option rn-icon-list user-account">
                    <div class="icon-box">
                      <Link href="/author">
                        <img src="/icons/boy-avater.png" alt="Images" />
                      </Link>
                      <div class="rn-dropdown">
                        <div class="rn-inner-top">
                          <h4 class="title">
                            <span>
                              <Link href="#">A/C no. </Link>
                            </span>
                            <span>{""}</span>
                            <Link href="author">{address.slice(0, 15)}...</Link>
                          </h4>
                        </div>

                        <ul class="list-inner">
                          <li>
                            <Link href="/author">My Profile</Link>
                          </li>
                          <li>
                            <Link href="#" onClick={() => disconnect()}>
                              Disconncet
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div class="setting-option mobile-menu-bar d-block d-xl-none">
                <div class="hamberger">
                  <button class="hamberger-button">
                    <i class="feather-menu"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div class="popup-mobile-menu">
        <div class="inner">
          <div class="header-top">
            <div class="logo logo-custom-css">
              <Link class="logo-light" href="index.html">
                <img src="/logo/logo-white.png" alt="nft-logo" />
              </Link>
              <Link class="logo-dark" href="index.html">
                <img src="/logo/logo-dark.png" alt="nft-logo" />
              </Link>
            </div>
            <div class="close-menu">
              <button class="close-button">
                <i class="feather-x"></i>
              </button>
            </div>
          </div>
          <nav>
            <ul class="mainmenu">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link class="nav-a its_new" href="/explor">
                  Explore
                </Link>
              </li>
              <li>
                <Link class="nav-a its_new" href="/">
                  Pages
                </Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
