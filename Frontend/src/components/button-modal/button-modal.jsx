import React,{Fragment} from 'react'

const ButtonModal = ({ isUpdated=false, toggle=false }) => {
  return (
  <Fragment>
          {!isUpdated ? (
        <button
          type="button"
          onClick={toggle}
          className="btn btn-success btn-icon btn-circle btn-lg me-2"
        >
          <i className="fa fa-plus"></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          className="btn btn-warning btn-icon btn-circle btn-lg me-2"
        >
          <i className="fa fa-check "></i>
        </button>
      )}
      </Fragment>
  )
}

export default ButtonModal