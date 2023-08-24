import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/recipes/create';

const CreateRecipe = async (name, cuisine, ingredients,base64Images) => {
    try {
        const response = await axios.post(apiUrl, {
            name: name,
            cuisine: cuisine,
            ingredients: ingredients,
            pictures: base64Images 
        }, 
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };
export default CreateRecipe