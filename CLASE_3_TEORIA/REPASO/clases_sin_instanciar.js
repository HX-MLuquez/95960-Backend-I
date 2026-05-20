// Clases sin necesidad de instanciar

class StudentController {
  static schoolName = "Escuela Primaria N° 123";
  static enrolledStudents = [];

  static register(studentData) {
    StudentController.enrolledStudents.push(studentData);
  }

  static getAll() {
    return [...StudentController.enrolledStudents];
  }
}

// Usar cual un solo objeto para manejar la información de los alumnos
StudentController.register({
  name: "Mauro",
  age: 22,
});

console.log(StudentController.getAll());

StudentController.register({
  name: "Ana",
  age: 20,
});

console.log(StudentController.getAll());

module.exports = { StudentController };
