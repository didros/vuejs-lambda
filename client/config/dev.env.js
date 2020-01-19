'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const APP_URL = 'http://localhost:8080/'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://localhost:8081/micro-posts/"',
  AUTH0_CLIENT_ID: '"xUvE3n8jZKldcz5yOFS7Lh77Y64yKcIa"',
  AUTH0_DOMAIN: '"did.eu.auth0.com"',
  AUTH0_LOGOUT_URL: `"${APP_URL}"`,
  AUTH0_CALLBACK_URL: `"${APP_URL}callback"`
})
