import React, { useState } from "react"
import Input from "@material-ui/core/Input"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button"
import { useDispatch } from "react-redux"
import { searchRecipes } from "../../actions"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

const RecipeForm = () => {
  const [term, setTerm] = useState("")
  const [ingredients, setIngredients] = useState(["milk"])
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(searchRecipes(term, ingredients))
  }

  const handleIngredients = (ingredient, event) => {
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }

    setIngredients([...ingredients])
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        autoFocus={true}
        fullWidth={true}
        onChange={e => setTerm(e.target.value)}
        value={term}
      />
      <div>
        <h3>Ingredients on hand</h3>
        {ingredientList.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={e => handleIngredients(ingredient, e)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button type="submit" fullWidth={true}>search</Button>
    </form>
  )
}

export default RecipeForm
