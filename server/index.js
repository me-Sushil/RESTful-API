const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  { id: "1", 
    name: "Sushil Bishowkarma", 
    number: "9819909012",
    important: true
 },
  { id: "2", 
    name: "Akash Tolange", 
    number: "9719093412",
    important: true
},
  { id: "3", 
    name: "Niru magar", 
    number: "9813409018",
    important: true
 },
  { id: "4", 
    name: "Muskan ....", 
    number: "9811909019",
    important: true
 },
  { id: "5", 
    name: "Libina Rai", 
    number: "9719309011",
    important: true
 },
  { id: "6", 
    name: "Sirisha .....", 
    number: "9714609014",
    important: true
 }
];

// GET request   and  HTML  response
app.get("/", (request, response)=>{
    response.send(
        `<div>
        <p>Hello akash How are you</p>
        <div>`
    )
})

//GET request and JSON response
app.get("/api/notes", (request, response) => {
    response.json(notes);
});

// GET request with Specific ID
app.get("/api/notes/:noteid", (request, response)=>{
    const id = request.params.noteid;
    const findUserSearchId = notes.find(note=> note.id === id);
    response.json(findUserSearchId);
})

app.delete("/api/notes/:noteid", (request, response) => {
  const nid = request.params.noteid;
  notes = notes.filter((note) => note.id !== nid);
  response.status(204).end();
});

app.post("/api/notes/", (request, response) => {
   const data = request.body;
notes.push(data);
response.json(notes);

});


// ✅ PUT request (update by id)
app.put("/api/notes/:noteid", (request, response) => {
  const id = request.params.noteid;
  const { name, number } = request.body;

  // Basic validation
  if (!name || !number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  let note = notes.find((n) => n.id === id);
  if (!note) {
    return response.status(404).json({ error: "Note not found" });
  }

  // Update values
  note.name = name;
  note.number = number;

  response.json(note);
});




const PORT = 3001;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
