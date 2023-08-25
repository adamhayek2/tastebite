import React, {useState, useEffect}from 'react'
import NavBar from '../../components/NavBar'
import HomeRecipes from '../../apis/Recipes';
import Card from '../../components/Card';

const Home = () => {
  const [recipe, setRcipe] = useState([]);
  const [error, setError] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await HomeRecipes();
      setError(false); 
      setRcipe(response)
    } catch (error) {
      console.error('Login failed', error);
      setError(true); 
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-24'>
      <NavBar/>
      <div className=' container flex flex-row gap-10'>
        {recipe.map((recipe) => (
          <Card recipe = {recipe} id={recipe.id}/>
              
        ))}
      </div>
    </div>
  )
}

export default Home