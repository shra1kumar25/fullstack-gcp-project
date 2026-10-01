const API_URL = import.meta.env.VITE_API_URL;

export interface Student {
  id: number;
  student_name: string;
  email: string;
  course: string;
  year: number;
}

export interface StudentCreate {
  student_name: string;
  email: string;
  course: string;
  year: number;
}

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students/`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

export async function createStudent(
  student: StudentCreate
): Promise<Student> {
  const response = await fetch(`${API_URL}/students/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return response.json();
}

export async function updateStudent(
  id: number,
  student: StudentCreate
): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  return response.json();
}

export async function deleteStudent(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
}
