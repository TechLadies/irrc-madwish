const express = require("express");
const router = express.Router();
// const debug = require('debug')('app:students')
const students = require("../helpers/students");
const statuses = require("../helpers/statuses.js")
const { UniqueViolationError } = require("objection");
const { NotFoundError } = require("objection");

// TODO: Handle errors 

/* POST multiple students to screening endpoint */
// on Postman: http://localhost:3001/students/1
router.post("/", async (req, res) => {
    if(Array.isArray(req.body)){
        // process each item asynchronously 
        await Promise.all(req.body.map(async item => {
            const status = await statuses.getStatusByStatusString(item.StatusString)
            item.StatusID = status.StatusID
            delete item.StatusString
            await students.patchStudent(item.StudentID, item)
            }
        ))
        return res.status(200).json(req.body);
    }
    return res.status(500).json({})
  });
  
module.exports = router