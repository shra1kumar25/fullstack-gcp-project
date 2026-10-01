import { useEffect, useState } from "react";
import "./App.css";

import {
  Button,
  Card,
  Input,
} from "@shra1kumar25/ui-library";

import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  type Student,
} from "./api/students";

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load students");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const clearForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setYear("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!name || !email || !course || !year) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const studentData = {
        student_name: name,
        email: email,
        course: course,
        year: Number(year),
      };

      if (editingId !== null) {
        await updateStudent(editingId, studentData);
        setMessage("Student updated successfully");
      } else {
        await createStudent(studentData);
        setMessage("Student created successfully");
      }

      clearForm();
      await loadStudents();
    } catch (error) {
      console.error(error);
      setMessage("Operation failed");
    }
  };

  const handleEdit = (student: Student) => {
    setName(student.student_name);
    setEmail(student.email);
    setCourse(student.course);
    setYear(String(student.year));
    setEditingId(student.id);
    setMessage("");
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      setMessage("Student deleted successfully");
      await loadStudents();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete student");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Student Management</h1>

      <Card>
        <h2>
          {editingId !== null
            ? "Update Student"
            : "Add Student"}
        </h2>

        <Input
          label="Student Name"
          placeholder="Enter student name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Course"
          placeholder="Enter course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        />

        <Input
          label="Year"
          type="number"
          placeholder="Enter year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />

        <Button onClick={handleSubmit}>
          {editingId !== null
            ? "Update Student"
            : "Add Student"}
        </Button>

        {editingId !== null && (
          <>
            {" "}
            <Button
              variant="secondary"
              onClick={clearForm}
            >
              Cancel
            </Button>
          </>
        )}

        {message && (
          <p style={{ marginTop: "15px" }}>
            {message}
          </p>
        )}
      </Card>

      <div style={{ marginTop: "30px" }}>
        <h2>Students</h2>

        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              style={{ marginBottom: "15px" }}
            >
              <Card>
                <h3>{student.student_name}</h3>

                <p>Email: {student.email}</p>
                <p>Course: {student.course}</p>
                <p>Year: {student.year}</p>

                <Button
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>

                {" "}

                <Button
                  variant="secondary"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
