import React,{Fragment} from "react";
import { useAsyncDebounce } from 'react-table';

  function TableFilter(props) {
    const count = props.preGlobalFilteredRows.length
    const [value, setValue] = React.useState(props.globalFilter)
    const onChange = useAsyncDebounce(value => {
      props.setGlobalFilter(value || undefined)
    }, 200)
    return (
      <Fragment>
      <div className="input-group mb-3"  >
          {/* <button
            className="btn btn-white"
            disabled={disabled}
              type="button">
              <span className="d-none d-md-inline">Filtrar Imoveis</span>
          </button> */}
          <div className="flex-fill position-relative">
            <div className="input-group">
              <div className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0" style={{ zIndex: 10 }}
              >
              <i className="fa fa-search opacity-5"></i>
              </div>
                <input
                  value={value || ""}
                  disabled={props.disabled}
                  onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  type="text"
                  autoFocus
                  className="form-control px-35px bg-light"                
                  placeholder={`${count} registros...`}
                />
            </div>
          </div>
        </div>
        </Fragment>
    )
  }

  export default TableFilter