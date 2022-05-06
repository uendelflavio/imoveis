import React from 'react'

export default function ColumnAction({ onClickUpdate, onClickDelete })  {
  return (
    <ul className="nav px-1 py-1 ">
        <li className="nav-item">
          <button
            type="button"
            onClick={onClickUpdate}
            className="btn btn-warning btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-check "></i>
          </button>
          <button
            type="button"
            onClick={onClickDelete}
            className="btn btn-danger btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-minus"></i>
          </button>
        </li>
      </ul>
  )
}


