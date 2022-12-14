import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useFormikContext } from "formik";
import { useList } from "react-use";
import { useSelector } from "react-redux";
import Base64 from "utils/base64";
import { getAllImovelImagem } from "slices/imovel-image-slice";
export const CarouselImageGallery = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imagens, { push, clear }] = useList();
  const CarouselImageGalleryRef = React.useRef(null);
  const data = useSelector(getAllImovelImagem);
  const formik = useFormikContext();
  const { Base64toFile } = Base64;

  React.useMemo(() => {
    const loadData = () => {
      if (data.length !== 0) {
        clear();
        for (let img in data) {
          push({
            original: data[img]["imagem"],
            thumbnail: data[img]["imagem"],
            descricao: data[img]["descricao"],
            id: data[img]["id"],
            width: "50px",
            height: "50px"
          });
        }
      }
    };
    loadData();
    // eslint-disable-next-line
  }, []);

  const onImageLoad = () => {
    setCurrentIndex(0);
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

    props.onImageLoading(
      CarouselImageGalleryRef.current.props.items[currentIndex].original
    );
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
    props.onImageLoading(
      CarouselImageGalleryRef.current.props.items[id].original
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
    props.onImageLoading(
      CarouselImageGalleryRef.current.props.items[currentIndex].original
    );
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
