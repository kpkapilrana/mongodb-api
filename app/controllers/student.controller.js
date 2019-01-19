const Student = require('../models/student.model');

//Create and save a new Student
exports.create = (req, res) =>{
        //Validate the request
        if(!req.body.first_name){
            return res.status(400).send({
                message:"Student content can not be empty"
            });
        }

        if(!req.body.mobile_number){
            return res.status(401).send({
                message:"Mobile Number can not be empty"
            });
        }
        //Create a Student
        const student = new Student({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            mobile_number:req.body.mobile_number
        })

        //Save Student
        student.save()
        .then( data => {
            res.send(data);
        })
        .catch(err => {
                res.status(500)
                .send({
                    message: err.message || "Some error occured while creating Student."
                })
        })
}

//Retrieve and return all students from the database
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
}

//Find a single student
exports.findOne = (req, res) =>{
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Student with id " + req.params.studentId
        });
    });
}

//Update a note identified by studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.mobile_number) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findOneAndUpdate(req.params.studentId, {
        first_name: req.body.first_name ,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.studentId
        });
    });
}

//Delete a note with specified studentId in request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
}