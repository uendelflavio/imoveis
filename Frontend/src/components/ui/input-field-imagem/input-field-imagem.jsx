import React from "react";
import { useFormikContext } from "formik";
import { Button, Input, Card, CardImg } from "reactstrap";
import Base64 from "utils/base64";
const InputFieldImagem = props => {
  const formik = useFormikContext();
  const [baseFile, setBaseFile] = React.useState("");
  const fileRef = React.useRef(null);

  return (
    <React.Fragment>
      <div className="text-start border-0 mb-2">
        <div className="col-md-12">
          {baseFile && !formik.errors[props.name]
            ? <div className="mb-2 p-1 text-end border border-1 rounded">
                <div className="col-md-12">
                  <Card className="border-0 m-2">
                    <CardImg top src={baseFile} alt="" />
                  </Card>
                </div>
              </div>
            : ""}
          <Button
            outline
            name="btn_upload"
            color={formik.errors[props.name] ? "danger" : "success"}
            onClick={() => fileRef.current.click()}
            className="position-relative border-2 m-0">
            <i className="fa fa-upload me-1" />
            Upload Imagem
            {formik.errors[props.name]
              ? <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" />
              : <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle" />}
          </Button>
        </div>
        <div className="d-flex justify-content-start">
          <Input
            hidden
            innerRef={fileRef}
            name={props.name}
            type="file"
            accept="image/*"
            onChange={e => {
              Base64.FiletoBase64(e.target.files[0]).then(img => {
                e.target.files[0].base64 = img;
                setBaseFile(img);
              });
              formik.setFieldValue(props.name, e.target.files[0]);
            }}
          />
          <div className="mt-1" style={{ width: "400px" }}>
            {formik.errors[props.name]
              ? <small className="bold text-danger">
                  {formik.errors[props.name]}
                </small>
              : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputFieldImagem;
