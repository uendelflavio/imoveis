import React from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppSettings } from "config/app-settings";
import SidebarProfile from "components/ui/sidebar/sidebar-profile";
import SidebarNav from "components/ui/sidebar/sidebar-nav";

const Sidebar = () => {
  const context = React.useContext(AppSettings);
  return (
    <AppSettings.Consumer>
      {({
        toggleAppSidebarMinify,
        toggleAppSidebarMobile,
        appSidebarTransparent,
      }) => (
        <React.Fragment>
          <div
            id="sidebar"
            className={"app-sidebar " +
              (context.appSidebarTransparent ? "app-sidebar-transparent" : "")}
          >
            <PerfectScrollbar
              className="app-sidebar-content h-100"
              options={{ suppressScrollX: true }}
            >
              <div className="menu">
                {!context.appSidebarSearch && <SidebarProfile />}
              </div>
              <SidebarNav />
              <div className="menu">
                <div className="menu-item d-flex">
                  <Link
                    to="/"
                    className="app-sidebar-minify-btn ms-auto"
                    onClick={context.toggleAppSidebarMinify}
                  >
                    <i className="fa fa-angle-double-left" />
                  </Link>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="app-sidebar-bg" />
          <div className="app-sidebar-mobile-backdrop">
            <Link
              to="/"
              onClick={context.toggleAppSidebarMobile}
              className="stretched-link"
            />
          </div>
        </React.Fragment>
      )}
    </AppSettings.Consumer>
  );
};

export default Sidebar;
