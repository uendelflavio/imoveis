import React from "react";
import { useFormikContext } from "formik";

const FieldInputFileImagem = (props) => {
    
  const [baseFile, setBaseFile] = React.useState('');
  const fileRef = React.useRef(null);
  const formik = useFormikContext();

  // React.useEffect(() => {
  //   const init = () => {
  //       if (props.isImage !== '') {        
  //         setBaseFile(props.isImage);
  //         props.onFile(baseFile.length)
  //       } else {
  //         setBaseFile('');
  //         props.onFile('')
  //       }
  //   }
  //   init();
  //  });
  
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
    <div className=" text-end border-0">
        <div className="col-md-12"> 
        <input
          hidden
          ref={fileRef}
          name={props.name}         
          id={props.name}
          type="file"
          accept="image/*"
          className={
            formik.touched[props.name] && formik.errors[props.name]
            ? "form-control is-invalid"
            : "form-control is-valid"
          }
          onClick={() => {
            if (formik.errors[props.name]) {
              setBaseFile('')
              props.onFile(0)
            }            
          }}
          onChange={(e) => {    
            formik.setFieldValue(props.name, e.target.files[0])             
            getBase64(e.target.files[0])
              .then(result => {
                resizeImage(result, 450, 450).then((result) => {                
                  setBaseFile(result)
                  e.target.files[0].base64 = result;                    
                });
              })
              .catch(
                err => {
                  console.log(err);             
                }
            );
            props.onFile(baseFile.length)
          }}
          />  
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className={baseFile.length <= 1 
                ? "btn btn-outline-danger position-relative border-2 m-0"
                : "btn btn-outline-success position-relative border-2 m-0"
              }
              >
              <i className="fa fa-upload me-1"></i>
              Upload
              {baseFile.length <= 1  ?                
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"/>
                : 
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle"/>
              }    
              {console.log('tamanho do arquivo: ',baseFile.length, ' erro: ',formik.errors[props.name])}
            </button>           
          </div>         
          <div style={{width: '120px'}} >
              {formik.errors[props.name] ? <small className='bold text-danger '>{formik.errors[props.name]}</small> : null}                     
          </div>
      </div>                                 
      </div>      
      </React.Fragment>
  );
};

export default FieldInputFileImagem;