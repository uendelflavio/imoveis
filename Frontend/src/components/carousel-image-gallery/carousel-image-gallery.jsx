import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImovelImagemService from '../../services/ImovelImagemService';
import ImovelService from '../../services/ImovelService';
export const CarouselImageGallery = (props) => {
  const [data, setData] = useState([]);
  const [isIdImage, setIdImage] = useState(0);
  const [isDescricao, setDescricao] = useState('');
  const [isImage, setImage] = useState('');
  const images = [];

  useEffect(() => {
    const fetchData = async () => {
      const result = await ImovelImagemService.getAll();
      const imovel_with_images = await ImovelService.getWithImages(props.isId)
      console.log(imovel_with_images)
      setData(result.imovel_imagens);
    };
    fetchData();
  }, []);

  for(let i = 0; i < data.length; i = i + 1 ) {
    images.push({
      original: data[i]['imagem'],
      thumbnail: data[i]['imagem'],
      descricao: data[i]['descricao'],
      id: data[i]['id'],
    })
  }

  const onImageLoad = () => {
    setIdImage(images[0]['id']);
    setDescricao(images[0]['descricao'])
    setImage(images[0]['imagem'])
    props.onDataImage(isIdImage,isDescricao,isImage)
  }

  const onSlide = (id) => {   
    setIdImage(images[id]['id']);
    setDescricao(images[id]['descricao']);   
    setImage(images[id]['imagem']);
    props.onDataImage(images[id]['id'], images[id]['descricao'], images[id]['imagem'])            
  }

  return (    
    <React.Fragment>
    <div className="mb-2 p-1 text-end border border-1 rounded">       
      <div className="col-md-12"> 
        <ImageGallery  showThumbnails={false} onImageLoad={onImageLoad} onSlide={onSlide} showPlayButton={false} additionalClass="app-image-gallery" items={images}/>
      </div>
      </div>      
    </React.Fragment>
  )
}
export default CarouselImageGallery;
