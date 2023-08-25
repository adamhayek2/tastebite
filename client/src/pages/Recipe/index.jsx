import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Carousel } from 'react-responsive-carousel';
import SingleRecipe from '../../apis/SingleRecipe'

const Racipe = () => {
    const { id } = useParams();

    const [recipe, setRcipe] = useState([]);
    const [error, setError] = useState([]);

    const fetchRecipe = async () => {
        try {
          const response = await SingleRecipe({id});
          setError(false); 
          setRcipe(response)
          console.log(response)
        } catch (error) {
          console.error('Login failed', error);
          setError(true); 
        }
      }
    
      useEffect(() => {
        fetchRecipe();
      }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-24'>
      <NavBar/>
      <div className='container'>
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
      </div>
    </div>
  )
}

export default Racipe