import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper } from "./styles"
import Divider from "@material-ui/core/Divider"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Alert from "@material-ui/lab/Alert"
import * as actions from "../../actions"
import Recipe from "../Recipe"
import RecipeForm from "../../components/RecipeForm"

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      term: "",
      ingredients: ["milk"],
    }
  }
  fetchSearch() {
    this.props.searchRecipes(this.state.term, this.state.ingredients)
  }
  fetchRecipe(id) {
    this.props.fetchRecipe(id)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.fetchSearch()
  }
  render() {
    const { recipes, isLoading, error } = this.props

    return (
      <HomeWrapper>
        <RecipeForm />
        <Divider />
        {error && <Alert severity="error">There was an error searching for recipes</Alert>}
        {recipes && recipes.length > 0 && (
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id} button={true} onClick={() => this.fetchRecipe(recipe.id)}>
                <ListItemText primary={recipe.name} />
              </ListItem>
            ))}
          </List>
        )}
        {
          recipes && recipes.length === 0 && (
            <Alert severity="info">No recipes found</Alert>
          )
        }
        {isLoading && <LinearProgress />}
        <Divider />
        <Recipe showViewLink={true} />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      fetchRecipe: actions.fetchRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
