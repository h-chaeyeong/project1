function addStudent() {

  const name = document.getElementById("studentName").value;
  const text = document.getElementById("studentText").value;
  const imageInput = document.getElementById("studentImage");

  if(name === "" || text === "") {
    alert("이름과 소개를 입력하세요!");
    return;
  }

  const file = imageInput.files[0];

  const reader = new FileReader();

  reader.onload = function(e) {

    const studentList = document.getElementById("studentList");

    const card = document.createElement("div");
    card.className = "student-card";

    card.innerHTML = `
      <img src="${e.target.result}" alt="학생 사진">
      <div class="student-info">
        <h3>${name}</h3>
        <p>${text}</p>
      </div>
    `;

    studentList.prepend(card);

    // 입력 초기화
    document.getElementById("studentName").value = "";
    document.getElementById("studentText").value = "";
    document.getElementById("studentImage").value = "";
  };

  if(file) {
    reader.readAsDataURL(file);
  } else {
    alert("사진을 업로드하세요!");
  }
}
