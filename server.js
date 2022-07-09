const express = require("express");
const cors = require("cors");
const app = express();
var bcrypt = require("bcryptjs");
var corsOptions = {
  origin: '*',
};
const db = require("./app/models");
const User = db.users;

app.use(cors(corsOptions));
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for not to recreate each time database but add new things
db.sequelize.sync().then(() => {
  initializeadmin();
});
//for devel to recreate each time database 
/*db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
   initializeadmin();
});*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to surveys application." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initializeadmin() {
  User.findOne({
    where: {
      username: "admin"
    }
  }).then(user => {
    if (!user) {
      User.create({
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("admin", 8),
        role: "admin"
      });
      return;
    }
  }); 
}