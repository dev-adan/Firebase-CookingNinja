import React, { useRef } from "react";
import "./Create.css";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Create = () => {
  let Navigate = useNavigate();

  const [title, setTitle] = React.useState();
  const [method, setMethod] = React.useState();
  const [cookingTime, setCookingTime] = React.useState();
  const [newIngredient, setNewIngredient] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const ingredientInput = useRef(null);
  const {postData,error,data} = useFetch('http://localhost:3000/recipes','POST');

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title,ingredients,method,cookingTime : cookingTime + ' minutes'});
 
  };

  React.useEffect(() => {

    if(data){
       Navigate('/')
    }
   

  },[data])

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if(ing && !ingredients.includes(ing)){
      setIngredients([...ingredients,ing])

    }

    setNewIngredient('');
    ingredientInput.current.focus();

  } 
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title: </span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients: </span>
          <div className="ingredients">
            <input 
            type="text"
            onChange = {(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}

            
             />
            <button className="btn" onClick={handleAdd}>add</button>
          </div>
        </label>

        <label>
          <span>Recipe Method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (Minutes): </span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Create;
