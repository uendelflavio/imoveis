import React from 'react'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export const CarouselImageGallery = (props) => {
  const [data, setData] = React.useState([]); 
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = [];

  React.useEffect(() => { 
    const loadData = () => {  
      if (props.data.imovel_imagens.length > 0) {              
        setData(props.data.imovel_imagens);
        data.forEach((v) => {
          images.push({
            original: v.imagem,
            thumbnail: v.imagem,
            descricao: v.descricao,
            id: v.id,
            width: "50px",
            height : "50px", 
          });
        });
      }
    }
    loadData()
  });

  const onImageLoad = () => {
    props.setIdImagem('000');
    props.setIsImagem(undefined);
    props.setIsDescricao('');

  }

  const onSlide = id => {
    setCurrentIndex(id);
    props.setIdImagem(images[currentIndex].id);   
    props.setIsImagem(images[currentIndex].imagem);    
    props.setIsDescricao(images[currentIndex].descricao);    
  }

  return (    
    <React.Fragment>
    <div className="mb-2 p-1 text-end border border-1 rounded">       
      <div className="col-md-12"> 
        <ImageGallery startIndex={currentIndex} onSlide={onSlide}  showThumbnails={false} onImageLoad={onImageLoad}  showPlayButton={false} additionalClass="app-image-gallery" items={images}/>
      </div>
      </div>      
    </React.Fragment>
  )
}
export default CarouselImageGallery;
