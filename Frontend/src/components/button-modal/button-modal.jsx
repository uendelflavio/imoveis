import React,{Fragment} from 'react'


const ButtonModal = (props) => {
  
  return (
  <Fragment>
          {!props.isUpdated ? (
        <button type="button" onClick={props.toggle} className="btn btn-success btn-icon btn-circle btn-lg me-2" >
          <i className="fa fa-plus"></i>
        </button>
      ) : (
        <button type="button" onClick={props.toggle} className="btn btn-warning btn-icon btn-circle btn-lg me-2" >
          <i className="fa fa-check "></i>
        </button>
      )}
      </Fragment>
  )
}

export default ButtonModal