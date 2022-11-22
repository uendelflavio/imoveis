import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DropdownNotification = props => {
  const [state, setState] = React.useState({ dropdownOpen: false });
  const toggle = () => setState(!state.prevState.dropdownOpen);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={state.dropdownOpen}
        toggle={toggle}
        className="navbar-item dropdown"
        tag="div">
        <DropdownToggle className="navbar-link dropdown-toggle icon" tag="a">
          <i className="fa fa-bell" />
          <span className="badge">0</span>
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu media-list dropdown-menu-end"
          end
          tag="div">
          <DropdownItem className="dropdown-header" tag="div" header>
            NOTIFICAÇÕES (0)
          </DropdownItem>
          <div className="text-center w-300px py-3">
            Nenhum notificação encontrada
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default DropdownNotification;
