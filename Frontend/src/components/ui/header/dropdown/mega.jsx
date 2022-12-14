import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const DropdownMegaMenu = (props) => {
  return (
    <React.Fragment>
      <Collapse className="collapse d-md-block me-auto" isOpen={props.collapse}>
        <div className="navbar-nav">
          <UncontrolledDropdown
            tag="div"
            className="navbar-item dropdown dropdown-lg flex-1"
          >
            <DropdownToggle
              tag="a"
              className="navbar-link dropdown-toggle d-flex align-items-center"
            >
              <i className="fa fa-th-large fa-fw me-1" />
              <span className="d-lg-inline d-md-none">Mega</span>
              <b className="caret ms-1" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-lg">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="h5 fw-bolder mb-2">UI Kits</div>
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <ul className="nav d-block fw-bold">
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            FontAwesome
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Ionicons
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Simple Line Icons
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Typography
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Media Object
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Widget Boxes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Tabs & Accordions
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul className="nav d-block fw-bold">
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Unlimited Nav Tabs
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Modal & Notification
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Buttons
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="h5 fw-bolder mb-2">
                    Page Options <span className="badge bg-pink ms-2">11</span>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <ul className="nav d-block fw-bold">
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Blank Page
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Footer{" "}
                            <span className="badge bg-success py-1">NEW</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page without Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Right Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Minified Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Two Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Line Icons
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul className="nav d-block fw-bold">
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Full Height Content
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Mega Menu
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Light Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/page-option/with-mega-menu"
                            className="text-ellipsis text-gray-800 text-decoration-none"
                          >
                            <i className="fa fa-chevron-right fa-fw text-gray-500" />
                            {" "}
                            Page with Large Sidebar
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 fw-bold">
                  <div className="h5 fw-bolder mb-2">Paragraph</div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis libero purus, fermentum at libero convallis, auctor
                    dignissim mauris. Nunc laoreet pellentesque turpis sodales
                    ornare. Nunc vestibulum nunc lorem, at sodales velit
                    malesuada congue. Nam est tortor, tincidunt sit amet eros
                    vitae, aliquam finibus mauris.
                  </p>
                  <p>
                    Fusce ac ligula laoreet ante dapibus mattis. Nam auctor
                    vulputate aliquam. Suspendisse efficitur, felis sed
                    elementum eleifend, ipsum tellus sodales nisi, ut
                    condimentum nisi sem in nibh. Phasellus suscipit vulputate
                    purus at venenatis. Quisque luctus tincidunt tempor.
                  </p>
                </div>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="navbar-item flex-1">
            <Link
              to="/page-option/with-mega-menu"
              className="navbar-link d-flex align-items-center"
            >
              <i className="fa fa-gem fa-fw me-1" />
              <span className="d-lg-inline d-md-none">Client</span>
            </Link>
          </div>
          <UncontrolledDropdown className="navbar-item dropdown flex-1">
            <DropdownToggle
              tag="a"
              className="navbar-link dropdown-toggle d-flex align-items-center"
            >
              <i className="fa fa-database fa-fw me-1" />
              <span className="d-lg-inline d-md-none">New</span>
              <b className="caret ms-1" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here...</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Separated link</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>One more Separated link</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default DropdownMegaMenu;
