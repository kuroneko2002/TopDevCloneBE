const router = require("express").Router();
const dbConnection = require("./database");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library

const handlers = {
  test: (req, res, next) => {
    dbConnection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
      if (err) throw err;
      console.log("The solution is: ", rows[0].solution);
    });
    return res
      .status(200)
      .json({ msg: "Hello from Application service split!" });
  },
  createDB: (req, res, next) => {
    const resetQuery = `DROP TABLE IF EXISTS Application;`;
    dbConnection.query(resetQuery, (err, result) => {
      if (err) throw err;
      console.log("delete successfull");
    });

    const createQuery = `
    CREATE TABLE Application (
      id VARCHAR(50) PRIMARY KEY,
      jobId VARCHAR(50),
      userId VARCHAR(50),
      name VARCHAR(100),
      cvUrl VARCHAR(255),
      email VARCHAR(100),
      phone VARCHAR(20),
      status VARCHAR(20) default 'new',
      rating INT default 0,
      note TEXT
  );    
    `;
    dbConnection.query(createQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    const insertQuery = `
    INSERT INTO Application (id, jobId,userId, name, cvUrl, email, phone, status, rating, note)
    VALUES ('application1', 'job1', 'user1', 'Nguyen Van A', '', '123@gmail.com', '123456789', 'new', 3, 'this is note 1');  
    `;
    dbConnection.query(insertQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.status(200).json({ msg: "Create db successfulll!" });
    });
  },
  create: (req, res, next) => {
    const application = req.body;
    const applicationId = uuidv4(); // Generate a new UUID for job ID

    // Assign the generated UUID to the job object
    application.id = applicationId;

    const insertQuery = "INSERT INTO Application SET ?";
    dbConnection.query(insertQuery, application, (err, result) => {
      if (err) {
        console.error("Error inserting application:", err);
        res.status(500).json({ error: "Failed to create application" });
        return;
      }

      console.log("Application created successfully:", result);
      return res.status(201).json({
        message: "Application created successfully",
      });
    });
  },
  updateStatus: (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (
      status !== "new" &&
      status !== "interview" &&
      status !== "offer" &&
      status !== "rejected"
    ) {
      return res.status(500).send("Invalid status");
    }

    // Update the status of the application in the database
    const sql = "UPDATE Application SET status = ? WHERE id = ?";

    dbConnection.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error("Error updating application status:", err);
        res.status(500).send("Error updating application status");
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send("Application not found");
        } else {
          console.log("Application status updated successfully");
          res
            .status(200)
            .send({ message: "Application status updated successfully" });
        }
      }
    });
  },
  getApplications: async (req, res, next) => {
    let sql = "SELECT * FROM Application";
    const { userId, jobId } = req.query;
    let isAddedWhere = false;
    if (userId && userId !== "") {
      sql = `SELECT * FROM Application WHERE userId = '${userId}'`;
      isAddedWhere = true;
    }

    if (jobId && jobId !== "") {
      sql = isAddedWhere
        ? `${sql} AND jobId = '${jobId}'`
        : `SELECT * FROM Application WHERE jobId = '${jobId}'`;
    }

    const getApplications = () =>
      new Promise((resolve, reject) => {
        dbConnection.query(sql, (err, result) => {
          if (err) {
            console.error("Error getting applications:", err);
            reject(err);
          } else {
            console.log("Applications retrieved successfully");
            resolve(result);
          }
        });
      });

    const applications = await getApplications();
    // console.log("applications", applications);

    for (var i = 0; i < applications.length; i++) {
      const getJobInfo = (jobId) =>
        new Promise((resolve, reject) => {
          const sql = "SELECT * FROM Jobs WHERE id = ?";
          dbConnection.query(sql, jobId, (err, result) => {
            if (err) {
              console.error("Error getting job info:", err);
              reject(err);
            } else {
              resolve(result[0]);
            }
          });
        });
      const job = await getJobInfo(applications[i].jobId);
      applications[i].job = job;
    }

    return res.status(200).json(applications);
  },
  getApplication: (req, res, next) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Application WHERE id = ?";

    dbConnection.query(sql, id, (err, result) => {
      if (err) {
        console.error("Error getting application:", err);
        res.status(500).send("Error getting application");
      } else {
        if (result.length === 0) {
          res.status(404).send("Application not found");
        } else {
          console.log("Application retrieved successfully");
          res.status(200).json(result[0]);
        }
      }
    });
  },
};

router.get("/", handlers.test);
router.get("/createdb", handlers.createDB);
router.post("/create", handlers.create);
router.put("/applications/:id/status", handlers.updateStatus);
router.get("/applications", handlers.getApplications);
router.get("/application/:id", handlers.getApplication);

module.exports = router;
