var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

const dataFilePath = path.join(__dirname, "../public/init_data.json");
let users = JSON.parse(fs.readFileSync(dataFilePath, "utf8")).data;
let curId = Object.keys(users).length + 1;

/* GET all users */
router.get("/", (req, res) => {
    res.json(Object.values(users));
});

/* POST: Create a new user */
router.post("/", (req, res) => {
  var user = req.body;
  
  if (!user.firstName || !user.lastName || !user.email) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  user.id = curId++;
  if (!user.state) {
      user.state = "pending";
  }
  users[user.id] = user;

  fs.writeFileSync(dataFilePath, JSON.stringify({ data: users }, null, 2)); // ✅ Persist data
  res.status(201).json(user);
});

/* GET a specific user by ID */
router.get("/:id", (req, res) => {
    const userId = req.params.id;
    const user = users[userId];

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});


/* PUT: Update a user */
router.put("/:id", (req, res) => {
    const userId = req.params.id;
    var user = req.body;

    if (!users[userId]) {
        return res.status(404).json({ error: "User not found" });
    }

    users[userId] = user;
    fs.writeFileSync(dataFilePath, JSON.stringify({ data: users }, null, 2)); // Persist data
    res.json(user);
});

/* DELETE: Remove a user */
router.delete("/:id", (req, res) => {
    const userId = req.params.id;

    if (!users[userId]) {
        return res.status(404).json({ error: "User not found" });
    }

    delete users[userId];
    fs.writeFileSync(dataFilePath, JSON.stringify({ data: users }, null, 2)); // Persist data
    res.sendStatus(204);
});

module.exports = router;
