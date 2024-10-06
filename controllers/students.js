const Student = require('../models/student');

// Get all students (static)
const getAllStudentsStatic = async (req, res) => {
  const students = await Student.find({}).sort({ name: 1 });
  res.status(200).json({ students, nbHits: students.length });
};

// Get all students with filters
const getAllStudents = async (req, res) => {
  const { course, name, sort, email, numericFilters } = req.query;
  const queryObject = {};

  if (course) {
    queryObject.course = course;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (email) {
    queryObject.email = { $regex: email, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['sem', 'cgpa'];

    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Student.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    console.log(sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort('dateEnrolled');
  }

  console.log('Query Object:', queryObject);
  const students = await result;
  res.status(200).json({ students, nbHits: students.length });
};
// Function to get a student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params; // Extract the student ID from the request parameters
  const student = await Student.findById(id); // Use Mongoose to find the student by ID

  if (!student) {
    return res.status(404).json({ message: 'Student not found' }); // Return a 404 error if not found
  }

  res.status(200).json({ student }); // Return the found student
};
// Add a new student
const addStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json({ student });
};

// Update a student by ID (PATCH)
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json({ student });
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  res.status(204).json({ message: 'Student deleted successfully' });
};

module.exports = {
  getAllStudents,
  getAllStudentsStatic,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById
};
