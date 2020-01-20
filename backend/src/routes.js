const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const auth0 = require('auth0');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const router = express.Router();

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_AUD, MONGODB_URL } = process.env;

// retrieve latest micro-posts
router.get('/', async (req, res) => {
  const collection = await loadMicroPostsCollection();
  res.send(
    await collection.find({}).toArray()
  );
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: `${AUTH0_AUD}`,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// insert a new micro-post
router.post('/', checkJwt, async (req, res) => {
  const collection = await loadMicroPostsCollection();

  const token = req.headers.authorization
    .replace('bearer ', '')
    .replace('Bearer ', '');

  const authClient = new auth0.AuthenticationClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
  });

  authClient.getProfile(token, async (err, userInfo) => {
    if (err) {
      return res.status(500).send(err);
    }

    await collection.insertOne({
      text: req.body.text,
      createdAt: new Date(),
      author: {
        sub: userInfo.sub,
        name: userInfo.name,
        picture: userInfo.picture,
      },
    });

    res.status(200).send();
  });
});

async function loadMicroPostsCollection() {
  console.log('MONGODB_URL=' + MONGODB_URL);
  const client = await MongoClient.connect(MONGODB_URL);
  return client.db('micro-blog').collection('micro-posts');
}

module.exports = router;
