import React from "react";
import { Button, Input } from 'reactstrap';
import { useFormikContext } from "formik";

const FieldInputFileImagem = (props) => {  
  const fileRef = React.useRef(null);
  const formik = useFormikContext();

  const resizeImage = (base64Str, maxWidth = 350, maxHeight = 350) => {
    return new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
        let canvas = document.createElement('canvas')
        const MAX_WIDTH = maxWidth
        const MAX_HEIGHT = maxHeight
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/png', 1))
      }
    })
  }
  
  const getBase64 = file => {
      return new Promise(resolve => {
        let baseURL = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          baseURL = reader.result;
          resolve(baseURL);
        };
      });
  };
  
  return (
    <React.Fragment>
      <div className="text-start border-0 mb-2">
        <div className="col-md-12">        
            <Button
              outline
              color={formik.errors[props.name] ? "danger" : "success"}
              onClick={() => fileRef.current.click()}
              className="position-relative border-2 m-0"
              >
              <i className="fa fa-upload me-1"></i>
              Upload  
              { formik.errors[props.name] ?
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" />
              :
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle"/>
              }
                                            
            </Button>           
          </div> 
        <div className="d-flex justify-content-start">
        <Input
          hidden
          innerRef={fileRef}
          name={props.name}         
          id={props.name}
          type="file"
          accept="image/*"
          className={
            formik.touched[props.name] && formik.errors[props.name]
            ? "form-control is-invalid"
            : "form-control is-valid"
          }         
          onChange={(e) => {   
            formik.setFieldValue(props.name, e.target.files[0])             
            getBase64(e.target.files[0])
              .then(result => {
                resizeImage(result, 400, 400).then((result) => {                
                  e.target.files[0].base64 = result;                    
                });
              })
              .catch(
                err => {
                  console.log(err);             
                }
            );            
          }}
          />           
          <div className="mt-1" style={{ width: '400px' }} >       
            {formik.errors[props.name] ? <small className="bold text-danger">{formik.errors[props.name]}</small> : null}                     
          </div>
      </div>                                 
      </div>      
      </React.Fragment>
  );
};

export default FieldInputFileImagem;