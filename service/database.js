const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const { useRouteLoaderData } = require('react-router-dom');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('divergentThreads');
const userCollection = db.collection('user');

// future collections
// const friendCollection = db.collection('friend');
// const gameCollection = db.collection('game');

(async function testConnection(){
   try {
      await client.connect();
      await db.command({ ping: 1});
      console.log(`connected to database!`);
   } catch (error) {
      console.log('unable to connect:', error.message);
      process.exit(1);
   }
})();

function getUser(email) {
   return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
   return userCollection.findOne({ token: token });
}

async function getUserByUsername(username) {
   return userCollection.findOne({ username: username });
}

async function addUser(user) {
   await userCollection.insertOne(user);
}

async function updateUser(user) {
   const { _id, ...userData } = user;

   await userCollection.updateOne(
      { email: user.email },
      { $set: userData }
   );
}

async function updateUserRemoveAuth(user) {
   await userCollection.updateOne(
      { email: user.email },
      { $unset: { token: 1 }}
   );
}

// future functions
// friends: sendFriendRequest(), acceptFriendRequest(), removeFriend(), getFriends()
// multiplayer: createGameRoom(), joinGameRoom(), getGameRoom(), updateGameRoom(), deleteGameRoom()

module.exports = {
   getUser,
   getUserByToken,
   getUserByUsername,
   addUser,
   updateUser,
   updateUserRemoveAuth
};
