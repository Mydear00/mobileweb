import { StudentManager } from "./managers/StudentManagers.js";
import { showList } from "./utils/ShowList.js";

const manager = new StudentManager();
manager.loadFromLocalStorage();

// ---------------------------
// ฟังก์ชันแสดงข้อมูล
// ---------------------------
function renderTable(students = manager.getAllStudents()) {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    showList(students);

    students.forEach((s) => {
        tableBody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.title_name}</td>
                <td>${s.first_name}</td>
                <td>${s.last_name}</td>
                <td>${s.email}</td>
                <td>${s.year}</td>
                <td>${s.major}</td>
            </tr>
        `;
    });
}

// โหลดข้อมูลตอนเริ่ม
renderTable();

// ---------------------------
// ปุ่มเพิ่มนักศึกษา
// ---------------------------
document.getElementById("addBtn").onclick = () => {
    const id = document.getElementById("id").value;
    const title_name = document.getElementById("title_name").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const year = Number(document.getElementById("year").value);
    const major = document.getElementById("major").value;

    const student = { id, title_name, first_name, last_name, email, year, major };

    manager.addStudent(student);
    renderTable();
};

// ---------------------------
// ค้นหาชื่อ
// ---------------------------
document.getElementById("searchNameBtn").onclick = () => {
    const keyword = document.getElementById("searchName").value;
    const results = manager.findStudentsByName(keyword);
    renderTable(results);
};

// ---------------------------
// ค้นหาสาขา
// ---------------------------
document.getElementById("searchMajorBtn").onclick = () => {
    const keyword = document.getElementById("searchMajor").value;
    const results = manager.findStudentsByMajor(keyword);
    renderTable(results);
};

// ---------------------------
// ค้นหาอีเมล
// ---------------------------
document.getElementById("searchEmailBtn").onclick = () => {
    const value = document.getElementById("searchEmail").value.toLowerCase();

    const results = manager.getAllStudents().filter(s =>
        s.email.toLowerCase().includes(value)
    );

    renderTable(results);
};


