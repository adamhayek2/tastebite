import React, {useState} from 'react'
import Input from '../Input';
import CreateRecipe from '../../apis/CreateRecipe';
import SmallInput from '../SmallInput';

const NewRecipeModal = ({open, onClose}) => {
    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [images, setImages] = useState([]);
    const [base64Images, setBase64Images] = useState([]);
    const [error, setError] = useState();

    const Create = async (e) => {
        e.preventDefault();

        const base64ImagesArray = [];
        images.forEach((image) => {
            const reader = new FileReader();
            reader.onload = () => {
            base64ImagesArray.push(reader.result);
            if (base64ImagesArray.length === images.length) {
                // All images have been converted to base64
                setBase64Images(base64ImagesArray);
                // Now you can send the base64ImagesArray to the server
            }
            };
            reader.readAsDataURL(image);
        });
        
        try {
            const response = await CreateRecipe(name, cuisine, ingredients,base64Images);
            setError(false); 
            
          } catch (error) {
            console.error('Failed to create', error);
            setError(true); 
          }
    }

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages([...images, ...selectedImages]);
        console.log(images)
    };

    if(!open) return null
  return (
    <div onClick={onClose} className='fixed w-screen h-screen bg-black/[.6] '>
        <div onClick={(e) => {
            e.stopPropagation()
        }}
        className=''>
            <form onSubmit={Create} className='flex flex-col centering bg-white w-96 p-10 justify-center items-center rounded'>
                <div on onClick={onClose} className='float-right'>X</div>
                <Input
                type="text"
                placeholder="Recipe name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <Input
                type="text"
                placeholder="cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                />
                <div className='flex flex-col justify-center items-center'>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className='flex flex-row justify-between w-72'>
                        <SmallInput
                        type="text"
                        placeholder="ingredient"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        />
                        <SmallInput
                        type="text"
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        />
                        </div>
                    ))}
                    <div
                        className='bg-[#ffd8ca]/70 w-10 h-10 rounded-full text-lg text-[#df0052] r-0 flex justify-center items-center'
                        onClick={addIngredient}
                        >+
                    </div>
                </div>
                <input
                type= "file"
                multiple
                className= " block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffd8ca] file:text-[#df0052] hover:file:bg-[#ffffff]"
                placeholder="image"
                onChange={handleImageChange}
                />
                <div className='flex flex-row gap-3 felx-wrap'> 
                    {images.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} width={100} height={100} />
                    ))}
                </div>
                <div
                className={`text-sm text-center text-red-500 absolute bottom-20 px-8 ${error ? "" : "hidden"}`}
                >
                {error}
                </div>

                <button
                type='submit'
                className='bg-[#df0052]/70 w-32 h-10 rounded-full text-white text-xl'
                >Add recipe
                </button>
            </form>
        </div>
    </div>

  )
}

export default NewRecipeModal