import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { doc, getDoc,setDoc } from "firebase/firestore";
import "./Recipe.css";

const Recipe = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const fetchRecipe = async () => {
      const recipes = doc(projectFirestore, "recipes", id);
      const snapshot = await getDoc(recipes);

      if (snapshot.empty) {
        setError("No Recipees to Load...");
        setIsPending(false);
      } else {
        setRecipe(snapshot.data());
        setIsPending(false);
      }
    };
 
    fetchRecipe();
  }, []);



  const updateHandler = async () => {

    // const data = {...recipe,title : 'paratha'};
    // const updateDoc = doc(projectFirestore,'recipes',id);
    // setDoc(updateDoc,data)

    await setDoc(doc(projectFirestore, "recipes", id), {
     ...recipe,title : 'updated 3rd tim'
    }).then(Navigate('/')).catch(error => console.log(error))
    
    


  }

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}

      <button onClick={updateHandler}>update</button>
    </div>
  );
};

export default Recipe;
