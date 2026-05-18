const studentForm = document.getElementById('student-form');
const studentGrid = document.getElementById('student-grid');
const studentCount = document.getElementById('student-count');
const photoInput = document.getElementById('student-photo');
const uploadText = document.querySelector('.upload-text');

let students = JSON.parse(localStorage.getItem('students')) || [];

document.addEventListener('DOMContentLoaded', displayStudents);

// 사진 업로드 시 파일명 표시해 주는 센스 기능
photoInput.addEventListener('change', function() {
    if(this.files && this.files[0]) {
        uploadText.textContent = this.files[0].name;
        uploadText.style.color = "#4a90e2";
    } else {
        uploadText.textContent = "사진 선택하기";
        uploadText.style.color = "#718096";
    }
});

// 학생 추가 기능
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('student-name').value;
    const info = document.getElementById('student-info').value;
    const file = photoInput.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const photoUrl = event.target.result;

            const newStudent = {
                id: Date.now(),
                name: name,
                info: info,
                photo: photoUrl
            };

            students.push(newStudent);
            saveAndRefresh();
            
            // 폼 초기화 및 업로드 텍스트 원상복구
            studentForm.reset();
            uploadText.textContent = "사진 선택하기";
            uploadText.style.color = "#718096";
        };

        reader.readAsDataURL(file);
    }
});

// 목록 출력 함수
function displayStudents() {
    studentGrid.innerHTML = '';
    studentCount.textContent = students.length;

    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <button class="btn-delete" title="삭제" onclick="deleteStudent(${student.id})">×</button>
            <div class="photo-container">
                <img src="${student.photo}" alt="${student.name} 학생">
            </div>
            <div class="student-info-box">
                <h3>${student.name}</h3>
                <p>${student.info}</p>
            </div>
        `;

        studentGrid.appendChild(card);
    });
}

// 학생 삭제 함수
function deleteStudent(id) {
    if(confirm("이 학생의 정보를 명부에서 삭제할까요?")) {
        students = students.filter(student => student.id !== id);
        saveAndRefresh();
    }
}

function saveAndRefresh() {
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}
