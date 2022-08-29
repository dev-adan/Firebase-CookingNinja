import './RecipeList.css'
import React from 'react'
import { Link } from 'react-router-dom';
import TrashCan from '../assets/trashIcon.svg';
import { projectFirestore } from '../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";

const RecipeList = ({recipes}) => {

  if(recipes.length === 0){
    return (
      <div className='error'>
        No recipes to load...
      </div>
    )
  }

  const  handleClick = async (id) => {

    await deleteDoc(doc(projectFirestore, "recipes", id));


  }

  return (
    <div className='recipe-list'>
    {recipes.map(recipe => (
        <div key={recipe.id} className='card'>
        <h3>{recipe.title}</h3>
        <p>{recipe.cookingTime} to make.</p>
        <div>
            {recipe.method.substring(0,100)}...
        </div>
        <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        <img 
        src={TrashCan}
        alt='trashcan icon' 
        className='delete'
        onClick={() => handleClick(recipe.id)} 

        />

        </div>
    ))}

    </div>
  )
}

export default RecipeList