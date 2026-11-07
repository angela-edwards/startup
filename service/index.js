const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// weather info from 7Timer
apiRouter.get('/weather', async (req, res) => {
    try {
        const url ='https://www.7timer.info/bin/api.pl?lon=-111.6585&lat=40.2338&product=civillight&output=json&unit=metric';

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('7Timer request failed');
        }

        const data = await response.json();

        if (!data.dataseries || data.dataseries.length == 0) {
            throw new Error('No weather data available');
        }

        const forecast = data.dataseries[0];

        res.send({
            weather: forecast.weather,
            date: forecast.date
        });
    } catch (error) {
        console.error('Weather API error:', error);

        res.status(500).send({
            msg: 'unable to retrieve weather information'
        });
    }
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
        msg: 'please fill in all fields'
    });
  }

  if (await findUser('username', username.trim())) {
    return res.status(409).send({
        msg: 'username already exists'
    });
  }

  if (await findUser('email', email.trim())) {
    return res.status(409).send({
        msg: 'email already exists'
    });
  }

  const user = await createUser(
    username.trim(),
    email.trim(),
    password
  );

  setAuthCookie(res, user.token);

  res.send({
    username: user.username,
    email: user.email
  });
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ username: user.username, email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.post('/characters', verifyAuth, (req, res) => {
    const character = req.body;

    if (
        !character.name ||
        !character.name.trim() ||
        !validPersonalities.includes(character.personality) ||
        !Number.isFinite(Number(character.strength)) ||
        !Number.isFinite(Number(character.intelligence)) ||
        !Number.isFinite(Number(character.charisma)) ||
        Number(character.strength) < 1 ||
        Number(character.strength) > 10 ||
        Number(character.intelligence) < 1 ||
        Number(character.intelligence) > 10 ||
        Number(character.charisma) < 1 ||
        Number(character.charisma) > 10
    ) {
        return res.status(400).send({
            msg: 'Invalid character information'
        });
    }

    req.user.character = {
        name: character.name.trim(),
        personality: character.personality,
        strength: Number(character.strength),
        intelligence: Number(character.intelligence),
        charisma: Number(character.charisma)
    };

    res.send(req.user.character);
});

// retrieve logged-in user's character
apiRouter.get('/characters/me', verifyAuth, (req, res) => {
    if (!req.user.character) {
        return res.status(404).send({
            msg: 'no character has been created'
        });
    }

    res.send(req.user.character);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(username, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: uuid.v4(),
    username: username,
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    character: null
  };

  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
