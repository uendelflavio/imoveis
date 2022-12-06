import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useFormikContext } from "formik";
import { useList } from "react-use";
import { useSelector } from "react-redux";
import Base64 from "utils/base64";

export const CarouselImageGallery = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const CarouselImageGalleryRef = React.useRef(null);
  const imovel_carousel = useSelector(state => state.imovelImageSlice);
  const formik = useFormikContext();
  const [imagens, { push, clear }] = useList();
  const { Base64toFile } = Base64;

  const data = React.useMemo(
    () => {
      if (imovel_carousel[0]) return imovel_carousel[0];
      else if (imovel_carousel) return imovel_carousel;
      else return [];
    },
    [imovel_carousel]
  );

  React.useMemo(() => {
    const loadData = () => {
      if (typeof data === "object") {
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
