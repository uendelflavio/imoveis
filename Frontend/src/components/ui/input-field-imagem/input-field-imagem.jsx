import React from "react";
import { useFormikContext } from "formik";
import { Button, Card, CardImg, Input } from "reactstrap";
import Base64 from "utils/base64";
import { useBase64ImagemStore } from "store/base64-imagem-store";
const InputFieldImagem = props => {
  const fileRef = React.useRef(null);
  const base64Ref = React.useRef(useBase64ImagemStore.getState().imagem);
  const { FiletoBase64 } = Base64;
  const { errors, setFieldValue } = useFormikContext();
  const [baseFile, setBaseFile] = React.useState();

  React.useEffect(() => {
    useBase64ImagemStore.subscribe(
      imagem => (base64Ref.current = imagem),
      state => state.imagem
    );
  }, []);

  React.useEffect(
    () => {
      setBaseFile(base64Ref.current.imagem);
    },
    [base64Ref.current.imagem, setBaseFile]
  );

  const CardImage = () => {
    return (
      <div className="col-md-12">
        {baseFile && !errors[props.name]
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
          name={`BtnUploadCardImage-${props.name}`}
          color={errors[props.name] ? "danger" : "success"}
          onClick={() => fileRef.current.click()}
          className="position-relative border-2 m-0">
          <i className="fa fa-upload me-1" />
          Upload Imagem
          {errors[props.name]
            ? <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" />
            : <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle" />}
        </Button>
      </div>
    );
  };

  const FileUploadImage = () => {
    return (
      <div className="d-flex justify-content-start">
        <Input
          hidden
          innerRef={fileRef}
          name={props.name}
          type="file"
          accept="image/*"
          onChange={e => {
            FiletoBase64(e.target.files[0])
              .then(resp => {
                setFieldValue(props.name, e.target.files[0]);
                e.target.files[0].base64 = resp;
                setBaseFile(resp);
              })
              .catch(err => {
                console.log(err);
              });
          }}
        />
        <div className="mt-1" style={{ width: "400px" }}>
          {errors[props.name]
            ? <small className="bold text-danger">
                {errors[props.name]}
              </small>
            : null}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="text-start border-0 mb-2">
        <CardImage />
        <FileUploadImage />
      </div>
    </React.Fragment>
  );
};

export default InputFieldImagem;
