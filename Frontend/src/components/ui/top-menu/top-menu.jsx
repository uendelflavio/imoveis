import React from "react";
import TopMenuNav from "components/ui/top-menu/top-menu-nav";
import { AppSettings } from "config/app-settings";

const TopMenu = () => {
  const context = React.useContext(AppSettings);
  return (
    <AppSettings.Consumer>
      {({ appTopMenuMobileToggled }) => (
        <div
          id="top-menu"
          className={"app-top-menu " +
            (context.appTopMenuMobileToggled ? "d-block " : "")}
        >
          <TopMenuNav />
        </div>
      )}
    </AppSettings.Consumer>
  );
};

export default TopMenu;
