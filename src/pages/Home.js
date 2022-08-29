import React from 'react'
import { useEffect,useState } from 'react';
import { RecipeList } from '../components';
import { projectFirestore } from '../firebase/config';
import {  collection, onSnapshot } from 'firebase/firestore';


const Home = () => {

  const [data,setData] = useState(null)
  const [isPending,setIsPending] = useState(false)


  useEffect(() => {

    setIsPending(true);

    const fetchData = async () => {
      // const recipes = collection(projectFirestore,'recipes');
      // const snapshot = await getDocs(recipes);
      // if(snapshot.empty){
      //   setError('No Recipees to Load...')
      //   setIsPending(false);
      // }else{
      //   let result = [];
      //   snapshot.docs.map((doc) => result.push({id : doc.id,...doc.data()}));
      //    setData(result)
      //    setIsPending(false);
      // } 
    }

    fetchData();

    const recipes = collection(projectFirestore,'recipes');
    const unsub = onSnapshot(recipes,(recipeSnapshot) => {
     let result = [];
     recipeSnapshot.forEach(recipe => result.push({id :recipe.id , ...recipe.data()}));
     setData(result)
       setIsPending(false)
   }) 
   


    return () => unsub();

   

  },[])

  return (
    <div className='home'>
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}

export default Home