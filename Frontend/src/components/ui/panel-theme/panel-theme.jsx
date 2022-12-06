import React from "react";
import { AppSettings } from "config/app-settings";
import { Input, Label } from "reactstrap";
const PanelTheme = () => {
  const context = React.useContext(AppSettings);

  const [state, setState] = React.useState({
    expand: false,
    theme: "dark",
    darkMode: false
  });

  let theme = [
    "red",
    "pink",
    "orange",
    "yellow",
    "lime",
    "green",
    "teal",
    "cyan",
    "blue",
    "purple",
    "indigo",
    "dark"
  ];

  const handleDarkMode = e => {
    if (e.target.checked) {
      context.handleSetAppDarkMode(true);
    } else {
      context.handleSetAppDarkMode(false);
    }
  };

  const handleHeaderFixed = e => {
    if (e.target.checked) {
      context.handleSetAppHeaderFixed(true);
    } else {
      context.handleSetAppHeaderFixed(false);
    }
  };

  const handleSidebarFixed = e => {
    if (e.target.checked) {
      context.handleSetAppSidebarFixed(true);
    } else {
      context.handleSetAppSidebarFixed(false);
    }
  };

  const handleHeaderInverse = e => {
    if (e.target.checked) {
      context.handleSetAppHeaderInverse(true);
    } else {
      context.handleSetAppHeaderInverse(false);
    }
  };

  const handleSidebarGrid = e => {
    if (e.target.checked) {
      context.handleSetAppSidebarGrid(true);
    } else {
      context.handleSetAppSidebarGrid(false);
    }
  };

  const handleGradientEnabled = e => {
    if (e.target.checked) {
      context.handleSetAppGradientEnabled(true);
    } else {
      context.handleSetAppGradientEnabled(false);
    }
  };

  const toggleExpand = e => {
    e.preventDefault();
    setState({ expand: !state.expand });
  };

  const toggleTheme = (e, theme) => {
    e.preventDefault();
    context.handleSetAppTheme(theme);
    setState({ theme: theme });
  };

  return (
    <AppSettings.Consumer>
      {({
        appDarkMode,
        appHeaderFixed,
        appHeaderInverse,
        appSidebarFixed,
        appSidebarGrid,
        appGradientEnabled
      }) =>
        <div className={"theme-panel " + (state.expand ? "active" : "")}>
          <a
            href="#0"
            onClick={e => toggleExpand(e)}
            className="theme-collapse-btn">
            <i className="fa fa-cog" />
          </a>
          <div
            className="theme-panel-content"
            data-scrollbar="true"
            data-height="100%">
            <h5>Configurações da Aplicação</h5>

            <div className="theme-list">
              {theme.map((theme, i) =>
                <div
                  key={i}
                  className={
                    "theme-list-item " + (state.theme === theme ? "active" : "")
                  }>
                  <a
                    href="#0"
                    onClick={e => toggleTheme(e, theme)}
                    className={"theme-list-link bg-" + theme}>
                    &nbsp;
                  </a>
                </div>
              )}
            </div>

            <div className="theme-panel-divider" />

            <div className="row mt-10px">
              <div className="col-8 control-label text-dark fw-bold">
                <div>
                  Modo Escuro{" "}
                  <span
                    className="badge bg-primary ms-1 py-2px position-relative"
                    style={{ top: "-1px" }}>
                    Novo
                  </span>
                </div>
                <div className="lh-14">
                  <small className="text-dark opacity-50">
                    Ajuste a aparência para reduzir o brilho e dar aos seus
                    olhos uma parada
                  </small>
                </div>
              </div>
              <div className="col-4 d-flex">
                <div className="form-check form-switch ms-auto mb-0">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    name="app-theme-dark-mode"
                    onChange={handleDarkMode}
                    id="appThemeDarkMode"
                    value="1"
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="appThemeDarkMode">
                    &nbsp;
                  </Label>
                </div>
              </div>
            </div>

            <div className="theme-panel-divider" />

            <div className="row mt-10px align-items-center">
              <div className="col-8 control-label text-dark fw-bold">
                Barra Lateral Corrigida
              </div>
              <div className="col-4 d-flex">
                <div className="form-check form-switch ms-auto mb-0">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    name="app-header-fixed"
                    onChange={handleHeaderFixed}
                    id="appHeaderFixed"
                    value="1"
                    checked={context.appHeaderFixed}
                  />
                  <Label className="form-check-label" htmlFor="appHeaderFixed">
                    &nbsp;
                  </Label>
                </div>
              </div>
            </div>
            <div className="row mt-10px align-items-center">
              <div className="col-8 control-label text-dark fw-bold">
                Cabeçalho inverso
              </div>
              <div className="col-4 d-flex">
                <div className="form-check form-switch ms-auto mb-0">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    name="app-header-inverse"
                    onChange={handleHeaderInverse}
                    id="appHeaderInverse"
                    checked={context.appHeaderInverse}
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="appHeaderInverse">
                    &nbsp;
                  </Label>
                </div>
              </div>
            </div>
            <div className="row mt-10px align-items-center">
              <div className="col-8 control-label text-dark fw-bold">
                Barra lateral corrigida
              </div>
              <div className="col-4 d-flex">
                <div className="form-check form-switch ms-auto mb-0">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    name="app-sidebar-fixed"
                    onChange={handleSidebarFixed}
                    id="appSidebarFixed"
                    checked={context.appSidebarFixed}
                  />
                  <Label className="form-check-label" htmlFor="appSidebarFixed">
                    &nbsp;
                  </Label>
                </div>
              </div>
            </div>
            <div className="row mt-10px align-items-center">
              <div className="col-8 control-label text-dark fw-bold">
                Barra lateral
              </div>
              <div className="col-4 d-flex">
                <div className="form-check form-switch ms-auto mb-0">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleSidebarGrid}
                    name="app-sidebar-grid"
                    id="appSidebarGrid"
                    checked={context.appSidebarGrid}
                  />
                  <Label className="form-check-label" htmlFor="appSidebarGrid">
                    &nbsp;
                  </Label>
                </div>
              </div>
            </div>
            <div className="row mt-10px align-items-center">
              <div className="col-md-8 control-label text-dark fw-bold">
                Gradiente ativado
              </div>
              <div className="col-md-4 d-flex">
                <div className="form-check form-switch ms-auto mb-0">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    name="app-gradient-enabled"
                    onChange={handleGradientEnabled}
                    id="appGradientEnabled"
                    checked={context.appGradientEnabled}
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="appGradientEnabled">
                    &nbsp;
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </AppSettings.Consumer>
  );
};

export default PanelTheme;
