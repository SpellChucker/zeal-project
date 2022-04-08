export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

export const executeGetRecipe = async (id) => {
  const response = await fetch(`/api/recipe/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const searchResults = await response.json()
  return searchResults
}

export const fetchRecipe = (id) => {
  return async (dispatch) => {
    dispatch(fetchingRecipe())
    try {
      const res = await executeGetRecipe(id)
      return dispatch(fetchedRecipe(res))
    } catch (err) {
      return dispatch(failedRecipe(err))
    }
  }
}
