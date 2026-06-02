// Load students automatically
loadStudents();

// Add Student
async function addStudent() {

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: document.getElementById("age").value
    };

    await fetch("/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    clearFields();

    loadStudents();
}

// Load Students
async function loadStudents() {

    const response = await fetch("/students");

    const students = await response.json();

    let output = "";

    students.forEach(student => {

        output += `
            <div class="student-card">

                <h3>${student.name}</h3>

                <p><b>Email:</b> ${student.email}</p>

                <p><b>Course:</b> ${student.course}</p>

                <p><b>Age:</b> ${student.age}</p>

                <button onclick="editStudent(
                    ${student.id},
                    '${student.name}',
                    '${student.email}',
                    '${student.course}',
                    ${student.age}
                )">
                    Edit
                </button>

                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </div>
        `;
    });

    document.getElementById("students").innerHTML = output;
}

// Edit Student
function editStudent(id, name, email, course, age) {

    document.getElementById("studentId").value = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("course").value = course;

    document.getElementById("age").value = age;
}

// Update Student
async function updateStudent() {

    const id = document.getElementById("studentId").value;

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: document.getElementById("age").value
    };

    await fetch(`/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    clearFields();

    loadStudents();
}

// Delete Student
async function deleteStudent(id) {

    await fetch(`/students/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

// Clear Input Fields
function clearFields() {

    document.getElementById("studentId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    document.getElementById("course").value = "";

    document.getElementById("age").value = "";
}