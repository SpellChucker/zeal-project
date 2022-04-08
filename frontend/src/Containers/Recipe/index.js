import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { fetchRecipe } from "../../actions";

// Create a recipe component using the recipe reducer to display the recipe.
export default function Recipe({ showViewLink = false }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const recipe = useSelector((state) => state.recipe.recipe)

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipe(id))
    }
  }, [id])

  if (!recipe) {
    return null
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.instructions}</p>
      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients.map((ingredient) => {
          const { id, name, amount, unit } = ingredient

          return <li key={id}>{amount} {unit} of {name}</li>
        })}
      </ul>
      {showViewLink && <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>}
    </div>
  )
}
