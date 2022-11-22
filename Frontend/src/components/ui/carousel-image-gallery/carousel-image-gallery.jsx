import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Input } from "reactstrap";
import { useFormikContext } from "formik";

export const CarouselImageGallery = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const CarouselImageGalleryRef = React.useRef(null);
  const InputFieldImagemRef = React.useRef(null);
  const formik = useFormikContext();

  const [imagens, setImagens] = React.useState([
    {
      original: formik.values["imagem"],
      thumbnail: formik.values["imagem"],
      descricao: formik.values["descricao"],
      id: formik.values["id"],
      width: "50px",
      height: "50px"
    }
  ]);

  const generateID = (stringLength = 20) => {
    let randomStr = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZqeytrpolkadjsghfgmnbzxcvnQPOWEYRKASJHDGFMNBCVX--___-_jsfhrlg-_124903564576986483658fgh4sdfh687e4h897WETHJ68F7G4688471877GFHJFFGJ87469857468746hfghwrtiyj4598yhdjkhgnk";
    for (let index = 0; index < stringLength; index++) {
      randomStr += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomStr;
  };

  const FiletoBase64 = file => {
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

  const Base64toFile = fileBase64 => {
    const index = generateID(20);

    let fileType = fileBase64
      .toString()
      .substring(
        fileBase64.toString().indexOf(":") + 1,
        fileBase64.toString().lastIndexOf(";")
      );
    let fileExtension = fileType.split("/");
    return new File([fileBase64], `file${index}.${fileExtension[1]}`, {
      type: fileType
    });
  };

  const onImageLoad = () => {
    setCurrentIndex(0);
    formik.setFieldValue("id", formik.values["id"]);
    formik.setFieldValue("descricao", formik.values["descricao"]);
    Base64toFile(formik.setFieldValue("imagem", formik.values["imagem"]));
  };

  const onSlide = id => {
    setCurrentIndex(id);
    formik.setFieldValue(
      "id",
      CarouselImageGalleryRef.current.props.items[id].id
    );
    formik.setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[id].descricao
    );
    formik.setFieldValue(
      "imagem",
      Base64toFile(CarouselImageGalleryRef.current.props.items[id].original)
    );
  };

  const onClick = () => {
    formik.setFieldValue(
      "id",
      CarouselImageGalleryRef.current.props.items[currentIndex].id
    );
    formik.setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[currentIndex].descricao
    );
    formik.setFieldValue(
      "imagem",
      Base64toFile(
        CarouselImageGalleryRef.current.props.items[currentIndex].original
      )
    );
  };

  return (
    <React.Fragment>
      <div className="mb-2 p-1 text-end border border-1 rounded">
        <div className="col-md-12">
          <ImageGallery
            ref={CarouselImageGalleryRef}
            onClick={onClick}
            startIndex={currentIndex}
            onSlide={onSlide}
            onImageLoad={onImageLoad}
            showPlayButton={false}
            additionalClass="app-image-gallery"
            items={imagens}
          />
        </div>
      </div>
      <div className="text-start border-0 mb-2">
        <div className="col-md-12">
          <Button
            outline
            color={formik.errors[props.name] ? "danger" : "success"}
            onClick={() => InputFieldImagemRef.current.click()}
            className="position-relative border-2 m-0">
            <i className="fa fa-upload me-1" />
            Upload
            {formik.errors[props.name]
              ? <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" />
              : <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle" />}
          </Button>
        </div>
        <div className="d-flex justify-content-start">
          <Input
            hidden
            innerRef={InputFieldImagemRef}
            name="input_imagem"
            type="file"
            accept="image/*"
            onChange={e => {
              FiletoBase64(e.target.files[0])
                .then(response => {
                  setImagens([
                    {
                      original: response,
                      thumbnail: response,
                      descricao: formik.values["descricao"],
                      id: formik.values["id"],
                      width: "50px",
                      height: "50px"
                    }
                  ]);
                  e.target.files[0].base64 = response;
                  formik.setFieldValue("imagem", e.target.files[0]);
                })
                .catch(err => {
                  console.log(err);
                });
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
export default CarouselImageGallery;
