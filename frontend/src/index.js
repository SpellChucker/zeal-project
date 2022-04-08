import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import { hot } from "react-hot-loader"
import { HashRouter, Switch, Route } from "react-router-dom"
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

const WrappedHome = () => (
  <Provider store={store}>
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/recipe/:id">
          <Recipe />
        </Route>
      </Switch>
    </HashRouter>
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))
