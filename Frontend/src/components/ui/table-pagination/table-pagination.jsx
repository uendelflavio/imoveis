import React from "react";
import { Button } from "reactstrap";

const TablePagination = (props) => {
  const MsgPagination = () => {
    return (
      <div
        sytle={{ fontFamily: "Roboto" }}
        className="me-md-auto text-md-left text-center mb-2 mb-md-0 fw-bolder"
      >
        {typeof props.page !== "undefined" && props.page.length === 1
          ? `Mostrando ${
            props?.page[0]?.cells[0]?.value?.toString()?.padStart(3, "0")
          } até ${
            props?.page[0]?.cells[0]?.value?.toString()?.padStart(3, "0")
          } com o total de ${props.rows} registro(s)`
          : `Mostrando ${
            props?.page[0]?.cells[0]?.value?.toString()?.padStart(3, "0")
          } até ${
            props?.page[props.page.length - 1]?.cells[0]?.value?.toString()
              ?.padStart(3, "0")
          } com o total de ${props.rows} registro(s)`}
      </div>
    );
  };

  const BtnFirstPage = () => {
    return (
      <Button
        name={`BtnFirstPage-${props.name}`}
        onClick={() => props.gotoPage(0)}
        disabled={!props.canPreviousPage}
        className="btn btn-dark btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Avançar ao primeiro registro."
      >
        <i className="fas fa-angle-double-left" />
      </Button>
    );
  };

  const BtnPreviousPage = () => {
    return (
      <Button
        name={`BtnPreviousPage-${props.name}`}
        onClick={() => props.previousPage()}
        disabled={!props.canPreviousPage}
        className="btn btn-dark btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Ir ao registro anterior."
      >
        <i className="fas fa-angle-left" />
      </Button>
    );
  };

  const BtnNextPage = () => {
    return (
      <Button
        name={`BtnNextPage-${props.name}`}
        onClick={() => props.nextPage()}
        disabled={!props.canNextPage}
        className="btn btn-dark btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Ir ao proximo registro."
      >
        <i className="fas fa-angle-right" />
      </Button>
    );
  };

  const BtnLastPage = () => {
    return (
      <Button
        name={`BtnLastPage-${props.name}`}
        onClick={() => {
          props.gotoPage(props.pageCount - 1);
        }}
        disabled={!props.canNextPage}
        className="btn btn-dark btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Avançar ao ultimo registro."
      >
        <i className="fas fa-angle-double-right" />
      </Button>
    );
  };

  return (
    <React.Fragment>
      {typeof props.page !== "undefined" && props.page.length > 0
        ? (
          <div className="d-md-flex align-items-center">
            <MsgPagination />
            <BtnFirstPage />
            <BtnPreviousPage />
            <BtnNextPage />
            <BtnLastPage />
          </div>
        )
        : ""}
    </React.Fragment>
  );
};

export default TablePagination;
