const express = require('express');
const {
  getAllStudents,
  getAllStudentsStatic,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById
} = require('../controllers/students'); // Updated to match student controller

const router = express.Router();

router.route('/').get(getAllStudents).post(addStudent); // GET all students & POST to add a new student

// Route to get students with static filtering (e.g., age > 30)
router.route('/static').get(getAllStudentsStatic);

// Routes to update and delete a student by ID
router.route('/:id').get(getStudentById)  // New route to get a student by ID
                    .patch(updateStudent)  // PATCH to update a student
                    .delete(deleteStudent); // DELETE to remove a student

module.exports = router;
