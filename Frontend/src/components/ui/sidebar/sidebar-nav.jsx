import React from "react";
import { Route } from "react-router-dom";
import { AppSettings } from "config/app-settings";
import SidebarNavList from "components/ui/sidebar/sidebar-nav-list";
import menus from "components/ui/sidebar/menu";
import { Input } from "reactstrap";

const SidebarNav = props => {
  const context = AppSettings;
  const [state, setState] = React.useState({
    active: -1,
    clicked: -1,
    menus: menus
  });

  const handleExpand = (e, i, match) => {
    e.preventDefault();
    if (state.clicked === -1 && match) {
      setState({
        active: -1,
        clicked: 1
      });
    } else {
      setState({
        active: state.active === i ? -1 : i,
        clicked: 1
      });
    }
  };

  const handleSidebarSearch = e => {
    let searchValue = e.target.value.toLowerCase();

    setState(() => {
      let newMenus = [];
      if (searchValue !== "") {
        newMenus = menus.filter(item => {
          let title = item.title;
          title = title.toLowerCase();
          if (title.search(searchValue) > -1) {
            item.search = true;
            return true;
          } else {
            if (item.children) {
              for (var i = 0; i < item.children.length; i++) {
                let title2 = item.children[i]["title"];
                title2 = title2.toLowerCase();

                if (title2.search(searchValue) > -1) {
                  item.search = true;
                  return true;
                }
              }
            }
            return false;
          }
        });
      } else {
        newMenus = menus.filter(item => {
          item.search = false;
          return true;
        });
      }
      return {
        menus: newMenus
      };
    });
  };
  return (
    <React.Fragment>
      <div className="menu">
        {context.appSidebarSearch &&
          <div className="menu-search mb-n3">
            <Input
              type="text"
              class="form-control"
              placeholder="Sidebar menu filter..."
              onKeyUp={handleSidebarSearch}
            />
          </div>}
        <div className="menu-header">Navigação</div>
        {state.menus.map((menu, i) =>
          <Route
            path={menu.path}
            exact={menu.exact}
            key={i}
            children={({ match }) =>
              <SidebarNavList
                data={menu}
                key={i}
                expand={e => handleExpand(e, i, match)}
                active={i === state.active}
                clicked={state.clicked}
              />}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default SidebarNav;
