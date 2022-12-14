import React from "react";
import { Route } from "react-router-dom";
import { AppSettings } from "config/app-settings.js";
import FloatSubMenuList from "components/ui/float-sub-menu/float-sub-menu-list";

const FloatSubMenu = (props) => {
  const context = React.useContext(AppSettings);
  const [state, setState] = React.useState({
    active: -1,
    clicked: -1,
  });

  const handleExpand = (e, i, match) => {
    e.preventDefault();
    if (state.clicked === -1 && match) {
      setState({ active: -1, clicked: 1 });
    } else {
      setState({ active: state.active === i ? -1 : i, clicked: 1 });
    }
    setTimeout(() => {
      context.handleAppSidebarFloatSubMenuClick();
    }, 0);
  };

  return (
    <AppSettings.Consumer>
      {({
        appSidebarFloatSubMenu,
        appSidebarFloatSubMenuActive,
        appSidebarFloatSubMenuTop,
        appSidebarFloatSubMenuLeft,
        appSidebarFloatSubMenuBottom,
        appSidebarFloatSubMenuLineTop,
        appSidebarFloatSubMenuLineBottom,
        appSidebarFloatSubMenuArrowTop,
        appSidebarFloatSubMenuArrowBottom,
        handleAppSidebarFloatSubMenuOnMouseOver,
        handleAppSidebarFloatSubMenuOnMouseOut,
      }) => (
        <div
          id="app-sidebar-float-submenu"
          onMouseOver={handleAppSidebarFloatSubMenuOnMouseOver}
          onMouseOut={handleAppSidebarFloatSubMenuOnMouseOut}
          className={"app-sidebar-float-submenu-container " +
            (appSidebarFloatSubMenuActive ? "d-block" : "d-none")}
          style={{
            left: appSidebarFloatSubMenuLeft,
            top: appSidebarFloatSubMenuTop,
            bottom: appSidebarFloatSubMenuBottom,
          }}
        >
          <div
            className="app-sidebar-float-submenu-arrow"
            style={{
              top: appSidebarFloatSubMenuArrowTop,
              bottom: appSidebarFloatSubMenuArrowBottom,
            }}
          />
          <div
            className="app-sidebar-float-submenu-line"
            style={{
              top: appSidebarFloatSubMenuLineTop,
              bottom: appSidebarFloatSubMenuLineBottom,
            }}
          />
          <div className="app-sidebar-float-submenu">
            {appSidebarFloatSubMenu &&
              appSidebarFloatSubMenu.map((menu, i) => (
                <Route
                  path={menu.path}
                  exact={menu.exact}
                  key={i}
                  children={({ match }) => (
                    <FloatSubMenuList
                      data={menu}
                      key={i}
                      expand={(e) => handleExpand(e, i, match)}
                      active={i === state.active}
                      clicked={state.clicked}
                    />
                  )}
                />
              ))}
          </div>
        </div>
      )}
    </AppSettings.Consumer>
  );
};

export default FloatSubMenu;
