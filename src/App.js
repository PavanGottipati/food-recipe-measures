import './App.css';
import React, {useEffect,useState} from 'react';
import Recipe from './Recipe';

const App=()=>{
  const APP_ID="86a10b33";
  const APP_KEY="4627fb7caf22e30f4150897a3b6cfd59";

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken');

  useEffect(()=>{
    getRecipes();
    console.log("Lets say we are fetching data");
  },[query]);

  const getRecipes=async()=>{
    const response=await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch=e=>{
    setSearch(e.target.value);
    //setSearch('');
  };

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">Submit</button>
        </form>
        <div className="recipes">
        {recipes.map(recipe=>(
          <Recipe 
           title={recipe.recipe.label} 
           calories={recipe.recipe.calories}
           image={recipe.recipe.image}
           ingredients={recipe.recipe.ingredients}
          />
        ))};
        </div> 
    </div>
  )
}
export default App;
