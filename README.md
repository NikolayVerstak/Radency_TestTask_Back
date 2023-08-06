# Overview

The Note Server App is a RESTful API built with Node.js, Express.js and LowDb that allows users to manage and manipulate notes.

## Features

-   Create new notes
-   Read existing notes
-   Update notes
-   Delete notes
-   Archive and unarchive notes
-   Get statistics about note categories

## API Endpoints

-   GET `/notes` - Get a list of all notes.

-   GET `/notes/:id` - Get a specific note by its ID.

-   POST `/notes` - - Create a new note.

-   PATCH `/notes/:id` - Update a note.

-   DELETE `/notes/:id` - Delete a note.

-   GET `/notes/stats` - Get statistics about note categories.

## Technologies

This app was built using the next technologies: Typescript, Node.js, Express.js, LowDb, Yup.

## How to launch locally

1. Clone the repository:
   `git clone https://github.com/NikolayVerstak/notes-node-app.git`

2. nstall the dependencies in the project directory:
   `cd notes-node-app`
   `npm install`

3. Run the server:
   `npm start`

4. Access the API at [http://localhost:3001](http://localhost:3001).
