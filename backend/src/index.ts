import express from "express"
import bodyParser from "body-parser"
import http from "http"
import { createAndConnectToServer } from "./db"
import { searchRouter, recipeRouter } from "./routes"
import { errorHandler } from "./middlewares"
import { NotFoundError } from "./errors"

const appStartup = async (): Promise<void> => {
  await createAndConnectToServer()
  const app = express()
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // create our routes
  app.use(searchRouter)
  app.use(recipeRouter)

  app.all('*', () => {
    throw new NotFoundError()
  })

  // Handle errors gracefully.
  app.use(errorHandler)

  // create a server
  const httpServer = new http.Server(app)
  httpServer.listen(4000, "0.0.0.0", () => {
    console.log("now running on 4000")
  })
}

appStartup()
