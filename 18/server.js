const express = require("express");
const app = express();
const jsonParser = express.json();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("UNIVER", "special", "password", {
  dialect: "mssql",
  host: "localhost"
});

const Auditorium = sequelize.define("AUDITORIUM", {
  AUDITORIUM: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false
  },
  AUDITORIUM_TYPE: {
    type: Sequelize.STRING,
    allowNull: true
  },
  AUDITORIUM_CAPACITY: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  AUDITORIUM_NAME: {
    type: Sequelize.STRING,
    allowNull: true,
    model: "AUDITORIUM_TYPE",
    key: "AUDITORIUM_TYPE"
  }
});

const AuditoriumType = sequelize.define("AUDITORIUM_TYPE", {
  AUDITORIUM_TYPE: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false
  },
  AUDITORIUM_TYPENAME: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

AuditoriumType.hasMany(Auditorium);

const Faculty = sequelize.define("FACULTY", {
  FACULTY: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false
  },
  FACULTY_NAME: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Pulpit = sequelize.define("PULPIT", {
  PULPIT: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false
  },
  PULPIT_NAME: {
    type: Sequelize.STRING,
    allowNull: true
  },
  FACULTY: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: true,
    model: "FACULTY",
    key: "FACULTY"
  }
});

Faculty.hasMany(Pulpit);

const Subject = sequelize.define("SUBJECT", {
  SUBJECT: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false
  },
  SUBJECT_NAME: {
    type: Sequelize.STRING,
    allowNull: true
  },
  PULPIT: {
    type: Sequelize.STRING,
    allowNull: true,
    model: "PULPIT",
    key: "PULPIT"
  }
});

Pulpit.hasMany(Subject);

const Teacher = sequelize.define("TEACHER", {
  TEACHER: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false
  },
  TEACHER_NAME: {
    type: Sequelize.STRING,
    allowNull: true
  },
  GENDER: {
    type: Sequelize.STRING,
    allowNull: true
  },
  PULPIT: {
    type: Sequelize.STRING,
    allowNull: true,
    model: "PULPIT",
    key: "PULPIT"
  }
});

Pulpit.hasMany(Teacher);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000.");
    });
  })
  .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });

app.use(express.static(__dirname + "/"));

app.get("/", (request, response) => {
  response.sendFile("index.html");
});

app.get("/api/faculties", jsonParser, (request, response) => {
  Faculty.findAll({ raw: true })
    .then(data => {
      console.log(data);
      response.send(data);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.get("/api/pulpits", jsonParser, (request, response) => {
  Pulpit.findAll({ raw: true })
    .then(data => {
      console.log(data);
      response.send(data);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.get("/api/subjects", jsonParser, (request, response) => {
  Subject.findAll({ raw: true })
    .then(data => {
      console.log(data);
      response.send(data);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.get("/api/auditoriumstypes", jsonParser, (request, response) => {
  AuditoriumType.findAll({ raw: true })
    .then(data => {
      console.log(data);
      response.send(data);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.get("/api/auditorims", jsonParser, (request, response) => {
  Auditorium.findAll({ raw: true })
    .then(data => {
      console.log(data);
      response.send(data);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.post("/api/faculties", jsonParser, (request, response) => {
  Faculty.create({
    FACULTY: request.body.faculty,
    FACULTY_NAME: request.body.faculty_name
  })
    .then(res => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.post("/api/pulpits", jsonParser, (request, response) => {
  Pulpit.create({
    PULPIT: request.body.pulpit,
    PULPIT_NAME: request.body.pulpit_name,
    FACULTY: request.body.faculty
  })
    .then(res => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.post("/api/subjects", jsonParser, (request, response) => {
  Subject.create({
    SUBJECT: request.body.subject,
    SUBJECT_NAME: request.body.subject_name,
    PULPIT: request.body.pulpit
  })
    .then(res => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.post("/api/auditoriumstypes", jsonParser, (request, response) => {
  AuditoriumType.create({
    AUDITORIUM_TYPE: request.body.auditorium_type,
    AUDITORIUM_TYPENAME: request.body.auditorium_typename
  })
    .then(res => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.post("/api/auditoriums", jsonParser, (request, response) => {
  Auditorium.create({
    AUDITORIUM: request.body.auditorium,
    AUDITORIUM_TYPENAME: request.body.auditorium_type,
    AUDITORIUM_CAPACITY: request.body.auditorium_capacity,
    AUDITORIUM_NAME: request.body.auditorium_name
  })
    .then(res => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.put("/api/faculties", jsonParser, (request, response) => {
  Faculty.update(
    { FACULTY_NAME: request.body.faculty_name },
    { where: { FACULTY: request.body.faculty } }
  )
    .then(() => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

pulapp.put("/api/pits", jsonParser, (request, response) => {
  Pulpit.update(
    { PULPIT_NAME: request.body.pulpit_name },
    { where: { PULPIT: request.body.pulpit } }
  )
    .then(() => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.put("/api/subjects", jsonParser, (request, response) => {
  Subject.update(
    { SUBJECT_NAME: request.body.subject_name },
    { where: { SUBJECT: request.body.subject } }
  )
    .then(() => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.put("/api/auditoriumstypes", jsonParser, (request, response) => {
  AuditoriumType.update(
    { AUDITORIUM_TYPENAME: request.body.auditorium_typename },
    { where: { AUDITORIUM_TYPE: request.body.auditorium_type } }
  )
    .then(() => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.put("/api/auditoriums", jsonParser, (request, response) => {
  Auditorium.update(
    { AUDITORIUM_CAPACITY: request.body.auditorium_capacity },
    { where: { AUDITORIUM: request.body.auditorium } }
  )
    .then(() => {
      console.log(request.body);
      response.send(request.body);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.delete("/api/faculties/:xyz", jsonParser, (request, response) => {
  const xyz = request.params["xyz"];
  Faculty.destroy({ where: { FACULTY: xyz } })
    .then(() => {
      console.log(xyz);
      response.send(xyz);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.delete("/api/pulpits/:xyz", jsonParser, (request, response) => {
  const xyz = request.params["xyz"];
  Pulpit.destroy({ where: { PULPIT: xyz } })
    .then(() => {
      console.log(xyz);
      response.send(xyz);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.delete("/api/subjects/:xyz", jsonParser, (request, response) => {
  const xyz = request.params["xyz"];

  Subject.destroy({ where: { SUBJECT: xyz } })
    .then(() => {
      console.log(xyz);
      response.send(xyz);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.delete("/api/auditoriumstypes/:xyz", jsonParser, function(
  request,
  response
) {
  const xyz = request.params["xyz"];
  AuditoriumType.destroy({ where: { AUDITORIUM_TYPE: xyz } })
    .then(() => {
      console.log(xyz);
      response.send(xyz);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});

app.delete("/api/auditoriums/:xyz", jsonParser, (request, response) => {
  const xyz = request.params["xyz"];
  Auditorium.destroy({ where: { AUDITORIUM: xyz } })
    .then(() => {
      console.log(xyz);
      response.send(xyz);
    })
    .catch(err => {
      console.log(err);
      response.status(500);
      response.json({ err: err });
    });
});
