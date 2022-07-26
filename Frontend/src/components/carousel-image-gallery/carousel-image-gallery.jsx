import React from 'react'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export const CarouselImageGallery = (props) => {
  const [data, setData] = React.useState([]);    
  const images = [];

  React.useEffect(() => { 
    const loadData = () => {    
      setData(props.data.imovel_imagens)
      data.forEach((v) => {
        images.push({
          original: v.imagem,
          thumbnail: v.imagem,
          descricao: v.descricao,
          id: v.id,
        });
      });
    }
    loadData()
  });

  const onImageLoad = () => {
    props.setIdImagem(images[0].id);
    props.setIsImagem(images[0].imagem);
    props.setIsDescricao(images[0].descricao);
  }

  const onBeforeSlide = (id) => {
    props.setIdImagem(images[id].id);   
    props.setIsImagem(images[id].imagem);
    props.setIsDescricao(images[id].descricao);
  }

  return (    
    <React.Fragment>
    <div className="mb-2 p-1 text-end border border-1 rounded">       
      <div className="col-md-12"> 
        <ImageGallery  showThumbnails={false} onImageLoad={onImageLoad} onBeforeSlide={onBeforeSlide} showPlayButton={false} additionalClass="app-image-gallery" items={images}/>
      </div>
      </div>      
    </React.Fragment>
  )
}
export default CarouselImageGallery;
