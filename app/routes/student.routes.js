module.exports = (app) =>{
    const students = require('../controllers/student.controller');

    //create a new Student
    app.post('/students', students.create);

    //Retrieve al Student
    app.get('/students', students.findAll);

    //Retrieve a single student with studentId
    app.get('/students/:studentId', students.findOne);

    //Update Student with studentId
    app.put('/students/:studentId', students.update);

    //Delete a Student
    app.delete('/students/:studentId', students.delete);
}