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
    <>
      <NavBar/>
      
      {recipe.map(recipe => (
            
            <div key={recipe.id}>
              {recipe.name}
            </div>
            // <Card data = {recipe}/>
          ))}
    </>
  )
}

export default Home