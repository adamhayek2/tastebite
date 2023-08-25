import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {ReactComponent as HeartSvg} from '../../images/HeartSvg.svg'
import Like from '../../apis/Like';


const Card = ( {recipe, id} ) => {
  const [isLiked, setIsLiked] = useState(false);

  const like = async () => {
    console.log(id)
    try {
      const response = await Like({id})

      if (response === "Recipe liked") {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking recipe', error);
    }
  };
  
  return (
<Link to={`/recipe/${recipe.id}`}>
    <div className="w-72 rounded-lg border  border-gray-300 " >
  <Carousel width={"100%"} showThumbs={false} showStatus={false}>
    {recipe.image.map((image, index) => (
      <div className="w-full h-full" key={index}>
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={`Image ${index}`}
          className="object-contain w-full h-full rounded-t"
        />
      </div>
    ))}
  </Carousel>
  <div className="flex flex-row justify-between items-center p-5">
    <div className="">
      <h2 className="text-3xl font-medium mb-3">{recipe.name}</h2>
      <p className="italic">{recipe.cuisine} cuisine</p>
    </div>
    <HeartSvg
      width={30}
      height={30}
      onClick={() => like()}
      style={{ fill: isLiked ? 'red' : 'grey', cursor: 'pointer' }}
    />
  </div>
</div>
</Link>
  )
}

export default Card