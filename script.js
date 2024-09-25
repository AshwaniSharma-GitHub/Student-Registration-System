document.getElementById('studentForm').addEventListener('submit', addStudent);

function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNo').value;

    if (!name || !id || !email || !contact) {
        alert('All fields are required');
        return;
    }

    // Validation for ID and contact number length
    if (id.length !== 5 || isNaN(id)) {
        alert('Student ID must be in 5 digits.');
        return;
    }

    if (contact.length !== 10 || isNaN(contact)) {
        alert('Contact Number must be a 10 digit number.');
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Check for duplicate student ID
    const existingStudent = students.find(student => student.id === id);
    if (existingStudent) {
        alert('This ID has already been registered.');
        return;
    }

    let student = { name, id, email, contact };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
    document.getElementById('studentForm').reset();
}

function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let tbody = document.querySelector('#studentsTable tbody');

    tbody.innerHTML = '';

    students.forEach((student, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    let student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));

    students.splice(index, 1);

    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

window.onload = function () {
    displayStudents();
};