import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useFormikContext } from "formik";
import useList from "hooks/use-list";
import Base64 from "utils/base64";

export const CarouselImageGallery = props => {
  const [state, setState] = React.useState({
    currentIndex: 0,
    modal: props.modal
  });
  const [imagens, { push, clear }] = useList();
  const CarouselImageGalleryRef = React.useRef(null);
  const { setFieldValue } = useFormikContext();
  const { Base64toFile } = Base64;

  React.useEffect(
    () => {
      if (state.modal) {
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
        setState({ ...state, modal: false });
      }
    },
    [state, props.data, clear, push]
  );

  const onImageLoad = () => {
    setState({ ...state, currentIndex: 0 });
    setFieldValue(
      "id",
      CarouselImageGalleryRef.current.props.items[state.currentIndex].id
    );
    setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[state.currentIndex].descricao
    );
    setFieldValue(
      "imagem",
      Base64toFile(
        CarouselImageGalleryRef.current.props.items[state.currentIndex].original
      )
    );
    if (state.modal) {
      props.setImagem(
        CarouselImageGalleryRef.current.props.items[state.currentIndex].original
      );
    }
  };

  const onSlide = id => {
    setState({ ...state, currentIndex: id });
    setFieldValue("id", CarouselImageGalleryRef.current.props.items[id].id);
    setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[id].descricao
    );
    setFieldValue(
      "imagem",
      Base64toFile(CarouselImageGalleryRef.current.props.items[id].original)
    );
    if (state.modal) {
      props.setImagem(CarouselImageGalleryRef.current.props.items[id].original);
    }
  };

  const onClick = () => {
    setFieldValue(
      "id",
      CarouselImageGalleryRef.current.props.items[state.currentIndex].id
    );
    setFieldValue(
      "descricao",
      CarouselImageGalleryRef.current.props.items[state.currentIndex].descricao
    );
    setFieldValue(
      "imagem",
      Base64toFile(
        CarouselImageGalleryRef.current.props.items[state.currentIndex].original
      )
    );
    if (state.modal) {
      props.setImagem(
        CarouselImageGalleryRef.current.props.items[state.currentIndex].original
      );
    }
  };

  return (
    <div className="mb-2 p-1 text-end border border-1 rounded">
      <div className="col-md-12">
        <ImageGallery
          ref={CarouselImageGalleryRef}
          onClick={onClick}
          onSlide={onSlide}
          onImageLoad={onImageLoad}
          startIndex={state.currentIndex}
          showPlayButton={false}
          additionalClass="app-image-gallery"
          items={imagens}
        />
      </div>
    </div>
  );
};
export default CarouselImageGallery;
