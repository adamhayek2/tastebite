import axios from "axios";


const SingleRecipe = async ({id}) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/singleRecipe/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching posts', error);
    }
}

export default SingleRecipe