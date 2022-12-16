import React from "react";
import { Button } from "reactstrap";
const PanelStat = React.createContext();

const Panel = props => {
  const toggleExpand = () => setState({ ...state, expand: !state.expand });
  const toggleRemove = () => setState({ ...state, remove: !state.remove });
  const toggleCollapse = () =>
    setState({
      ...state,
      collapse: !state.collapse
    });
  const toggleReload = () => {
    if (state.reload !== true) {
      setState({ ...state, ...state, reload: true });
      setTimeout(() => {
        setState({ ...state, reload: false });
      }, 2000);
    }
  };

  const [state, setState] = React.useState({
    expand: false,
    collapse: false,
    reload: false,
    remove: false,
    toggleExpand,
    toggleRemove,
    toggleCollapse,
    toggleReload
  });

  return (
    <PanelStat.Provider value={state}>
      {!state.remove &&
        <div
          className={
            "panel panel-" +
            (props.theme ? props.theme : "inverse") +
            " " +
            (state.expand ? "panel-expand " : " ") +
            (state.reload ? "panel-loading " : " ") +
            (props.className ? props.className : "")
          }>
          {props.children}
        </div>}
    </PanelStat.Provider>
  );
};

const PanelHeader = props => {
  return (
    <div className={"panel-heading " + props.className}>
      <h4 className="panel-title">
        {props.children}
      </h4>
      {!props.noButton &&
        <PanelStat.Consumer>
          {({ toggleExpand, toggleRemove, toggleCollapse, toggleReload }) =>
            <div className="panel-heading-btn">
              <Button
                className="btn btn-xs btn-icon btn-circle btn-default"
                onClick={toggleExpand}>
                <i className="fa fa-expand" />
              </Button>&nbsp;&nbsp;
              <Button
                className="btn btn-xs btn-icon btn-circle btn-success"
                onClick={toggleReload}>
                <i className="fa fa-redo" />
              </Button>&nbsp;&nbsp;
              <Button
                className="btn btn-xs btn-icon btn-circle btn-warning"
                onClick={toggleCollapse}>
                <i className="fa fa-minus" />
              </Button>&nbsp;&nbsp;
              <Button
                className="btn btn-xs btn-icon btn-circle btn-danger"
                onClick={toggleRemove}>
                <i className="fa fa-times" />
              </Button>
            </div>}
        </PanelStat.Consumer>}
    </div>
  );
};

const PanelBody = props => {
  return (
    <PanelStat.Consumer>
      {({ collapse, reload }) =>
        <div
          className={
            "panel-body " + (collapse ? "d-none " : " ") + props.className
          }>
          {props.children}

          {reload &&
            <div className="panel-loader">
              <span className="spinner spinner-sm" />
            </div>}
        </div>}
    </PanelStat.Consumer>
  );
};

const PanelFooter = props => {
  return (
    <div className={"panel-footer " + props.className}>
      {props.children}
    </div>
  );
};

export { Panel, PanelBody, PanelFooter, PanelHeader };
