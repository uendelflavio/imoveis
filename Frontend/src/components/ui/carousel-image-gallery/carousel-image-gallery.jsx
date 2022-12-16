import React from "react";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import { useFormikContext } from "formik";
import { useList } from "react-use";
import Base64 from "utils/base64";
import { useBase64ImagemStore } from "store/base64-imagem-store";

export const CarouselImageGallery = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imagens, { push, clear }] = useList();
  const CarouselImageGalleryRef = React.useRef(null);
  const { setFieldValue } = useFormikContext();
  const { Base64toFile } = Base64;

  const loadData = React.useCallback(() => {
    if (props.data.length !== 0) {
      clear();
      for (let img in props.data) {
        push({
          original: props.data[img]["imagem"],
          thumbnail: props.data[img]["imagem"],
          descricao: props.data[img]["descricao"],
          id: props.data[img]["id"],
          width: "50px",
          height: "50px"
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const onImageLoad = () => {
    setCurrentIndex(0);
    setFieldValue(
      "id",
      CarouselImageGalleryRef.current.props.items[currentIndex].id
    );
    setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[currentIndex].descricao
    );
    setFieldValue(
      "imagem",
      Base64toFile(
        CarouselImageGalleryRef.current.props.items[currentIndex].original
      )
    );
    useBase64ImagemStore.setState({
      imagem: CarouselImageGalleryRef.current.props.items[currentIndex].original
    });
  };

  const onSlide = id => {
    setCurrentIndex(id);
    setFieldValue("id", CarouselImageGalleryRef.current.props.items[id].id);
    setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[id].descricao
    );
    setFieldValue(
      "imagem",
      Base64toFile(CarouselImageGalleryRef.current.props.items[id].original)
    );

    useBase64ImagemStore.setState({
      imagem: CarouselImageGalleryRef.current.props.items[id].original
    });
  };

  const onClick = () => {
    setFieldValue(
      "id",
      CarouselImageGalleryRef.current.props.items[currentIndex].id
    );
    setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[currentIndex].descricao
    );
    setFieldValue(
      "imagem",
      Base64toFile(
        CarouselImageGalleryRef.current.props.items[currentIndex].original
      )
    );
    useBase64ImagemStore.setState({
      imagem: CarouselImageGalleryRef.current.props.items[currentIndex].original
    });
  };

  return (
    <React.Fragment>
      <div className="mb-2 p-1 text-end border border-1 rounded">
        <div className="col-md-12">
          <ImageGallery
            name={props.name}
            ref={CarouselImageGalleryRef}
            onClick={onClick}
            onSlide={onSlide}
            onImageLoad={onImageLoad}
            startIndex={currentIndex}
            showPlayButton={false}
            additionalClass="app-image-gallery"
            items={imagens}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default CarouselImageGallery;
