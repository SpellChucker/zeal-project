import React from "react"
import { connect } from "react-redux"

// Create a recipe component using the recipe reducer to display the recipe.
export const Recipe = ({ recipe }) => {
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
          const { _id, name, amount, unit } = ingredient

          return <li key={_id}>{amount} {unit} of {name}</li>
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

export default connect(mapStateToProps)(Recipe)
