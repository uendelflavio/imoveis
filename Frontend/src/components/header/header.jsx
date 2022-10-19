import React from "react";
import { Link } from "react-router-dom";
import DropdownNotification from "components/header/dropdown/notification.jsx";
import DropdownLanguage from "components/header/dropdown/language.jsx";
import DropdownProfile from "components/header/dropdown/profile.jsx";
import SearchForm from "components/header/search/form.jsx";
import DropdownMegaMenu from "components/header/dropdown/mega.jsx";
import { AppSettings } from "config/app-settings.js";

const Header = props => {
  const [state,setState] = React.useState({appHeaderMegaMenuMobile: false})
  const toggleAppHeaderMegaMenuMobile = () => setState(!state.appHeaderMegaMenuMobile);

    return (
      <AppSettings.Consumer>
        {({
          toggleAppSidebarMobile,
          toggleAppSidebarEnd,
          toggleAppSidebarEndMobile,
          toggleAppTopMenuMobile,
          appHeaderLanguageBar,
          appHeaderMegaMenu,
          appHeaderInverse,
          appSidebarTwo,
          appTopMenu,
          appSidebarNone,
        }) => (
          <div
            id="header"
            className={
              "app-header " + (appHeaderInverse ? "app-header-inverse" : "")
            }
          >
            <div className="navbar-header">
              {appSidebarTwo && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppSidebarEndMobile}
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              )}
              <Link to="/" className="navbar-brand">
                <span className="navbar-logo"></span> <b>Sys</b> Imóveis
              </Link>

              {appHeaderMegaMenu && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppHeaderMegaMenuMobile}
                >
                  <span className="fa-stack fa-lg text-inverse">
                    <i className="far fa-square fa-stack-2x"></i>
                    <i className="fa fa-cog fa-stack-1x"></i>
                  </span>
                </button>
              )}
              {appTopMenu && !appSidebarNone && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppTopMenuMobile}
                >
                  <span className="fa-stack fa-lg text-inverse">
                    <i className="far fa-square fa-stack-2x"></i>
                    <i className="fa fa-cog fa-stack-1x"></i>
                  </span>
                </button>
              )}
              {appSidebarNone && appTopMenu && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppTopMenuMobile}
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              )}
              {!appSidebarNone && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppSidebarMobile}
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              )}
            </div>

            {appHeaderMegaMenu && (
              <DropdownMegaMenu collapse={state.appHeaderMegaMenuMobile} />
            )}

            <div className="navbar-nav">
              <SearchForm />
              <DropdownNotification />

              {appHeaderLanguageBar && <DropdownLanguage />}

              <DropdownProfile />

              {appSidebarTwo && (
                <div className="navbar-divider d-none d-md-block"></div>
              )}

              {appSidebarTwo && (
                <div className="navbar-item d-none d-md-block">
                  <Link
                    to="/"
                    onClick={toggleAppSidebarEnd}
                    className="navbar-link icon"
                  >
                    <i className="fa fa-th"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </AppSettings.Consumer>
    );
 
}

export default Header;
