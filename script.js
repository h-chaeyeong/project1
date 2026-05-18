// HTML 요소 가져오기
const studentForm = document.getElementById('student-form');
const studentGrid = document.getElementById('student-grid');
const studentCount = document.getElementById('student-count');

// 로컬 스토리지에서 기존 학생 데이터 불러오기 (없으면 빈 배열)
let students = JSON.parse(localStorage.getItem('students')) || [];

// 페이지 처음 로드 시 화면에 학생 목록 표시
document.addEventListener('DOMContentLoaded', displayStudents);

// 폼 제출 이벤트 리스너 (학생 추가)
studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 페이지 새로고침 방지

    const name = document.getElementById('student-name').value;
    const info = document.getElementById('student-info').value;
    const photoInput = document.getElementById('student-photo');
    const file = photoInput.files[0];

    if (file) {
        const reader = new FileReader();
        
        // 이미지를 텍스트(DataURL) 형태로 변환하여 저장할 수 있게 함
        reader.onload = function(event) {
            const photoUrl = event.target.result;

            const newStudent = {
                id: Date.now(), // 고유 ID 생성
                name: name,
                info: info,
                photo: photoUrl
            };

            students.push(newStudent);
            saveAndRefresh();
            studentForm.reset(); // 입력창 초기화
        };

        reader.readAsDataURL(file);
    }
});

// 화면에 학생 카드들을 렌더링하는 함수
function displayStudents() {
    studentGrid.innerHTML = ''; // 기존 목록 비우기
    studentCount.textContent = students.length; // 인원수 업데이트

    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <button class="btn-delete" onclick="deleteStudent(${student.id})">×</button>
            <div class="photo-container">
                <img src="${student.photo}" alt="${student.name} 학생 사진">
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
    if(confirm("정말 이 학생 정보를 삭제하시겠습니까?")) {
        students = students.filter(student => student.id !== id);
        saveAndRefresh();
    }
}

// 데이터를 로컬 스토리지에 저장하고 화면을 새로고침하는 함수
function saveAndRefresh() {
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}
