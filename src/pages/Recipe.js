import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore/lite";
import "./Recipe.css";

const Recipe = () => {
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
    </div>
  );
};

export default Recipe;
