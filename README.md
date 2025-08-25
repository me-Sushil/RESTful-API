Notes API (Express)
A tiny demo REST API built with Node.js + Express that manages an in-memory list of “notes” (really, people with name and number). It supports:
GET /api/notes — list all notes
GET /api/notes/:id — get a note by id
POST /api/notes — create (pushes request body as-is)
PUT /api/notes/:id — update name & number (basic validation)
DELETE /api/notes/:id — delete a note by id
GET / — simple HTML greeting
⚠️ Data is stored in memory. It resets every time you restart the server.
⚠️ Current POST route does not auto-generate an id; if you want the new note to be retrievable by id, include an id in your POST body or update the code to assign one.

1) Prerequisites
Node.js (LTS recommended, e.g. 18+)
npm (comes with Node.js)

Optional (for a nicer testing experience):
VS Code + REST Client extension (by Huachao Mao)

2) Getting Started (Step by Step)
A) Clone and install
# 1) Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>

# 2) Install dependencies
# If the project contains package.json, just do:
npm install

# If there is NO package.json yet, initialize and install express:
# npm init -y
# npm install express
# (Optional for auto-restart during development)
# npm install --save-dev nodemon

B) (Optional) Add npm scripts

If you initialized your own package.json, add these scripts:

{
  "scripts": {
    "start": "node index.js",   // or server.js (match your filename)
    "dev": "nodemon index.js"
  }
}

C) Run the server
# Using Node
npm start

# Or, with auto-reload during development (if you installed nodemon)
npm run dev


By default the server listens on http://localhost:3001
 (see const PORT = 3001 in the code).

3) Project Structure (minimal)
.
├── index.js        # your Express server (the code you shared)
└── requests.http   # (optional) REST Client file to test endpoints


You can name the server file index.js or server.js—just keep your npm scripts in sync.

4) API Endpoints
Base URL
http://localhost:3001

GET

GET /
Returns a small HTML page.

GET /api/notes
Returns the full list of notes as JSON.

GET /api/notes/:id
Returns the note with the given id.

Current behavior: if no note is found, the response may be null (no explicit 404 in the provided code).

POST

POST /api/notes
Creates a new note by pushing the request body into the array.
Important: The current code does not validate or generate an id. If you want the new note to be retrievable by id later, include an id field in your POST body (e.g., "id": "7"), or update the code to generate one.

PUT

PUT /api/notes/:id
Updates name and number for an existing note.

Returns 400 if name or number is missing (basic validation).

Returns 404 if the note is not found.

DELETE

DELETE /api/notes/:id
Deletes the note with the given id. Returns 204 No Content on success.

5) Testing the API
Option A: VS Code REST Client (requests.http)

Create a file named requests.http in the project root with the following content:

########
## GET all notes
get http://localhost:3001/api/notes

########
## GET notes by id
get http://localhost:3001/api/notes/2

########
## PUT update notes (valid update)
put http://localhost:3001/api/notes/2
content-type: application/json

{
  "name": "Akash Update",
  "number": "+977 9719093412"
}

########
## PUT update notes (invalid data, will fail validation)
put http://localhost:3001/api/notes/2
content-type: application/json

{
  "name": "",
  "number": "not-a-phone-number"
}

########
## DELETE note by id
delete http://localhost:3001/api/notes/2

########
## POST create note
post http://localhost:3001/api/notes
content-type: application/json

{
  "id": "7",
  "name": "Suresh Bishowkarma",
  "number": "040-123456"
}


Open the file in VS Code and click Send Request above each request line.
If you prefer your original POST body without id, you can omit it—just remember the note won’t have an id unless you add generation logic in the server.

Option B: curl (terminal)
# GET all
curl http://localhost:3001/api/notes

# GET by id
curl http://localhost:3001/api/notes/2

# PUT (valid)
curl -X PUT http://localhost:3001/api/notes/2 \
  -H "Content-Type: application/json" \
  -d '{"name":"Akash Update","number":"+977 9719093412"}'

# PUT (invalid -> 400)
curl -X PUT http://localhost:3001/api/notes/2 \
  -H "Content-Type: application/json" \
  -d '{"name":"","number":"not-a-phone-number"}'

# DELETE
curl -X DELETE http://localhost:3001/api/notes/2

# POST (with id so it’s retrievable later)
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"id":"7","name":"Suresh Bishowkarma","number":"040-123456"}'

6) Notes on Validation & Behavior
PUT /api/notes/:id performs basic validation: both name and number must be present (non-empty).
POST /api/notes currently accepts any shape and does not generate an id. Add your own id or modify the route to assign one.
Since storage is in-memory, all changes are lost when the server restarts. Use a database if you need persistence.

7) Changing the Port
The code hardcodes:
const PORT = 3001;

To change the port, edit that line and restart the server.

8) Troubleshooting
Port already in use: Change PORT or stop the conflicting process.
Cannot GET/PUT/DELETE: Make sure the server is running on http://localhost:3001.
Newly created note not retrievable by id: Include an id in your POST body, or update the POST handler to generate one (e.g., String(Date.now())).
