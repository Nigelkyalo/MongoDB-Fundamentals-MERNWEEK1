# MongoDB Week 1 - plp_bookstore

This project contains scripts and sample data for the Week 1 MongoDB assignment.

Files added/updated:

- `insert_books.js` - sample insert script (reads `MONGODB_URI` env var or falls back to `mongodb://localhost:27017`).
- `queries.js` - runnable helper with the CRUD, advanced queries, aggregation pipelines, and index helpers required by the assignment.
- `.env.example` - example env file showing `MONGODB_URI` format.

Quick setup
1. Install Node.js (if not installed) and the MongoDB Node driver:

```powershell
npm install mongodb
```

2. Configure connection string:
 - For MongoDB Atlas, create a user and network access as described in the assignment. Copy the connection string and set it in an environment variable.

On Windows PowerShell (temporary for the session):

```powershell
$env:MONGODB_URI = "mongodb+srv://<username>:<password>@<cluster-url>/plp_bookstore?retryWrites=true&w=majority"
```

Or create a `.env` file (do not commit) and use a tool like `dotenv` if you prefer.

3. Insert sample books into the `plp_bookstore` database:

```powershell
node insert_books.js
```

This script will connect to the database, drop the `books` collection if it already contains documents, and insert the sample dataset.

4. Run queries/demo:

```powershell
node queries.js
```

This will print demo outputs for the required queries, run aggregation examples, create the recommended indexes, and show an `explain()` for an example query.

Notes
- Do NOT commit real credentials. Use `.env` or environment variables locally.
- `queries.js` exports functions you can import in other scripts or run directly.

If you'd like, I can also:
- Run the scripts locally (I won't run network commands that require your credentials)
- Add a simple `package.json` with a `start`/`seed` script
- Create a screenshot guide for Compass verification
# MongoDB Fundamentals - Week 1

## Setup Instructions

Before you begin this assignment, please make sure you have the following installed:

1. **MongoDB Community Edition** - [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)
2. **MongoDB Shell (mongosh)** - This is included with MongoDB Community Edition
3. **Node.js** - [Download here](https://nodejs.org/)

### Node.js Package Setup

Once you have Node.js installed, run the following commands in your assignment directory:

```bash
# Initialize a package.json file
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb
```

## Assignment Overview

This week focuses on MongoDB fundamentals including:
- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
- Indexing for performance

## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 