import React from 'react'
import { Button } from "reactstrap";
const TablePagination = (props) => {
  return (
    <React.Fragment>
        <div className="d-md-flex align-items-center">
        <div sytle={{fontFamily: 'Roboto'}} className="me-md-auto text-md-left text-center mb-2 mb-md-0 fw-bolder" hidden={props.pageOptions.length > 0 ? false : true}>
                Mostrando {props.pageIndex + 1} até {props.pageSize} com o total de {props.pageOptions.length} registro(s)
              </div>
              <Button
                onClick={() => props.gotoPage(0)}
                disabled={!props.canPreviousPage}
                className="btn btn-dark btn-icon btn-circle btn-lg me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Avançar ao primeiro registro."
              >
                <i className="fas fa-angle-double-left" />
              </Button>
              <Button
                onClick={() => props.previousPage()}
                disabled={!props.canPreviousPage}
                className="btn btn-dark btn-icon btn-circle btn-lg me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Ir ao registro anterior."
              >
                <i className="fas fa-angle-left" />
              </Button>
              <Button
                onClick={() => props.nextPage()}
                disabled={!props.canNextPage}
                className="btn btn-dark btn-icon btn-circle btn-lg me-2"
                  data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Ir ao proximo registro."
              >
                <i className="fas fa-angle-right" />
              </Button>
              <Button
                onClick={() => props.gotoPage(props.pageCount - 1)}
                disabled={!props.canNextPage}
                className="btn btn-dark btn-icon btn-circle btn-lg me-2"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Avançar ao ultimo registro."
              >
              <i className="fas fa-angle-double-right" />
              </Button>
        </div>
    </React.Fragment>
  )
}

export default TablePagination