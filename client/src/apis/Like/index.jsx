import axios from "axios";


const Like = async ({id}) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/recipes/addlike/${id}`,{}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      return response.status;
    } catch (error) {
      console.error('Error fetching posts', error);
    }
}

export default Like