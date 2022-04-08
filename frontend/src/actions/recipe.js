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

  return response
}

export const fetchRecipe = (id) => {
  return async (dispatch) => {
    dispatch(fetchingRecipe())
    try {
      const res = await executeGetRecipe(id)
      const recipe = await res.json()

      if (res.ok) {
        return dispatch(fetchedRecipe(recipe))
      }

      return dispatch(failedRecipe(recipe))
    } catch (err) {
      return dispatch(failedRecipe(err))
    }
  }
}
