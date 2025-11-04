// queries.js
// Runnable helper script with the MongoDB queries required by the assignment.
// Usage: set environment variable MONGODB_URI (or rely on localhost fallback), then:
//    node queries.js
// The file exposes functions and runs a small demo when executed directly.

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collName = 'books';

async function withCollection(fn) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection(collName);
    return await fn(coll);
  } finally {
    await client.close();
  }
}

// Task 2: Basic CRUD queries
async function findByGenre(genre) {
  return withCollection(coll => coll.find({ genre }).toArray());
}

async function findPublishedAfter(year) {
  return withCollection(coll => coll.find({ published_year: { $gt: year } }).toArray());
}

async function findByAuthor(author) {
  return withCollection(coll => coll.find({ author }).toArray());
}

async function updatePrice(title, newPrice) {
  return withCollection(coll => coll.updateOne({ title }, { $set: { price: newPrice } }));
}

async function deleteByTitle(title) {
  return withCollection(coll => coll.deleteOne({ title }));
}

// Task 3: Advanced queries
async function inStockAfter(year) {
  return withCollection(coll => coll.find({ in_stock: true, published_year: { $gt: year } }).toArray());
}

async function projectionTitleAuthorPrice() {
  return withCollection(coll => coll.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());
}

async function sortByPrice(direction = 1) { // 1 = asc, -1 = desc
  return withCollection(coll => coll.find().sort({ price: direction }).toArray());
}

async function paginate(page = 1, perPage = 5) {
  const skip = (page - 1) * perPage;
  return withCollection(coll => coll.find().skip(skip).limit(perPage).toArray());
}

// Task 4: Aggregation pipelines
async function avgPriceByGenre() {
  return withCollection(coll => coll.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]).toArray());
}

async function authorWithMostBooks() {
  return withCollection(coll => coll.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]).toArray());
}

async function groupByDecade() {
  return withCollection(coll => coll.aggregate([
    { $project: { decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } } },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]).toArray());
}

// Task 5: Indexing helpers
async function createIndexes() {
  return withCollection(coll => Promise.all([
    coll.createIndex({ title: 1 }),
    coll.createIndex({ author: 1, published_year: 1 })
  ]));
}

async function explainQuery(filter) {
  return withCollection(coll => coll.find(filter).explain('executionStats'));
}

// Demo runner when executed directly
if (require.main === module) {
  (async () => {
    console.log('Connecting to', uri);

    console.log('\n1) Find Fiction books:');
    console.dir(await findByGenre('Fiction'), { depth: 2 });

    console.log('\n2) Find books published after 2000:');
    console.dir(await findPublishedAfter(2000), { depth: 2 });

    console.log('\n3) Projection (title, author, price):');
    console.dir(await projectionTitleAuthorPrice(), { depth: 2 });

    console.log('\n4) Aggregation: average price by genre:');
    console.dir(await avgPriceByGenre(), { depth: 2 });

    console.log('\n5) Create indexes (title, author+published_year):');
    console.dir(await createIndexes(), { depth: 2 });

    console.log('\n6) Explain example query (title = "1984")');
    console.dir(await explainQuery({ title: '1984' }), { depth: 2 });

    console.log('\nDemo complete. Edit/require this file to call specific functions as needed.');
  })().catch(err => {
    console.error('Error in queries demo:', err);
    process.exit(1);
  });
}

module.exports = {
  findByGenre,
  findPublishedAfter,
  findByAuthor,
  updatePrice,
  deleteByTitle,
  inStockAfter,
  projectionTitleAuthorPrice,
  sortByPrice,
  paginate,
  avgPriceByGenre,
  authorWithMostBooks,
  groupByDecade,
  createIndexes,
  explainQuery
};
