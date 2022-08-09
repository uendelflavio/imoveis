import React from 'react'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useFormikContext } from "formik";

export const CarouselImageGallery = (props) => {
  const [data, setData] = React.useState([]); 
  const [currentIndex, setCurrentIndex] = React.useState(props.isIndex);
  const images = [];
  const ref = React.useRef();
  const formik = useFormikContext();

  React.useEffect(() => {
    const loadData =  () => {
      if (props.data.length > 0) {
        setData(props.data)      
        data.forEach((v) => { 
          images.push({
            original: v.imagem,
            thumbnail: v.imagem,
            descricao: v.descricao,
            id: v.id,
            width: "50px",
            height: "50px",
          });
        });
      }
    };
    loadData()
  });
  
  const generateID = (stringLength = 20) => {
    let randomStr = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZqeytrpolkadjsghfgmnbzxcvnQPOWEYRKASJHDGFMNBCVX--___-_jsfhrlg-_124903564576986483658fgh4sdfh687e4h897WETHJ68F7G4688471877GFHJFFGJ87469857468746hfghwrtiyj4598yhdjkhgnk";
    for (let index = 0; index < stringLength; index++) {
      randomStr += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomStr;
  };
  
  const convertedFiles = (fileBase64) => {
    const index = generateID(20);
    let fileType = fileBase64.substring(
      fileBase64.indexOf(":") + 1,
      fileBase64.lastIndexOf(";")
    );    
    let fileExtension = fileType.split('/');
    return new File([fileBase64], `file${index}.${fileExtension[1]}`, {type: fileType});
  }

  const onImageLoad = () => {  
    if (formik.setFieldValue('id', ref.current.props.items.length > 0)) {
      setCurrentIndex(0);
      formik.setFieldValue('id', ref.current.props.items[0].id);
      formik.setFieldValue('descricao', ref.current.props.items[0].descricao);
      formik.setFieldValue('imagem', convertedFiles(ref.current.props.items[0].original));
    }
  }

  const onSlide = id => {  
    if (formik.setFieldValue('id', ref.current.props.items.length > 0)) {
      setCurrentIndex(id);
      formik.setFieldValue('id', ref.current.props.items[currentIndex].id);
      formik.setFieldValue('descricao', ref.current.props.items[currentIndex].descricao);
      formik.setFieldValue('imagem', convertedFiles(ref.current.props.items[currentIndex].original));
    }
  }

  const onClick = () => {    
    formik.setFieldValue('id', ref.current.props.items[currentIndex].id);
    formik.setFieldValue('descricao', ref.current.props.items[currentIndex].descricao);
    formik.setFieldValue('imagem', convertedFiles(ref.current.props.items[currentIndex].original)); 
    
  }

  return (    
    <React.Fragment>
    <div className="mb-2 p-1 text-end border border-1 rounded">       
      <div className="col-md-12"> 
          <ImageGallery ref={ref} onClick={onClick} startIndex={currentIndex} onSlide={onSlide}  showThumbnails={false} onImageLoad={onImageLoad}  showPlayButton={false} additionalClass="app-image-gallery" items={images}/>
      </div>
      </div>      
    </React.Fragment>
  )
}
export default CarouselImageGallery;
