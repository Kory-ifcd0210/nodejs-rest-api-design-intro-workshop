const db = require("../models");
const { getSeedUsers } = require("./seed-data");

async function seedUsers() {
  const users = getSeedUsers();

  await db.User.deleteMany({});
  await db.User.create([...users]);
}

function getRandomItem(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedBooks() {
  await Promise.all([db.User.deleteMany({}), db.Book.deleteMany({})]);

  const users = await db.User.insertMany([...getSeedUsers()]);
  const userIds = users.map((user) => user._id);
  const booksWithAuthors = [...getSeedBooks()].map((book) => ({
    ...book,
    author: getRandomItem(userIds),
  }));

  return db.Book.insertMany(booksWithAuthors);
}

module.exports = {
  seedUsers: seedUsers,
  getRandomItem: getRandomItem,
  seedBooks: seedBooks,
};
