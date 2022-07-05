import React, {useState, useRef, Fragment  } from "react";
import { useFormikContext  } from "formik";
import { Card, CardImg } from 'reactstrap';

const FieldInputFile = (props) => {

  const formik = useFormikContext();  
  const [baseFile, setBaseFile] = useState('');
  const fileRef = useRef(null);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    e.target.files[0].base64 = base64;
    setBaseFile(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error)
      };      
    })
  }

  return (
    <Fragment>
    <div className="p-1 text-end border-0">
        <div className="col-md-12"> 
        <input
          hidden
          ref={fileRef}
          name={props.name}         
          id={props.name}
          type="file"
          className={
                formik.touched[props.name] && formik.errors[props.name]
                  ? "form-control is-invalid"
                  : "form-control is-valid"
          }
          onChange={(e) => {
            uploadFile(e);
           formik.setFieldValue(props.name,e.target.files[0])            
          }}
          />   
          
          {formik.errors[props.name]  ? <small className='bold text-danger'>{formik.errors[props.name]}</small>:null} 
          <button type="button" onClick={() => fileRef.current.click()} className="btn-info btn-lg border-0 m-2">
             <i className="fa fa-upload">&nbsp;&nbsp;</i>
             Upload Imagem
          </button>                 
      </div>
      {baseFile ?  <Card className="border-0 m-2"><CardImg top src={baseFile} alt="" /></Card>: ''}                    
      </div>
      </Fragment>
  );
};

export default FieldInputFile;