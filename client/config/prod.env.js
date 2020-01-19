'use strict'
const APP_URL = ''

module.exports = {
  NODE_ENV: '"production"',
  BACKEND_URL: '"https://w2026fjbqa.execute-api.eu-central-1.amazonaws.com/latest/micro-posts"',
  AUTH0_CLIENT_ID: '"YkYKymkaR88WLpcDYBRr56DnJRtaExf8"',
  AUTH0_DOMAIN: '"245skole.eu.auth0.com"',
  AUTH0_LOGOUT_URL: `"${APP_URL}"`,
  AUTH0_CALLBACK_URL: `"${APP_URL}callback"`
}