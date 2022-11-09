const loginForm = document.querySelector('.login-form');
const $form = document.querySelector('.todo-form');
const test = document.querySelector('.login-submit');
const hiddenLogin = document.querySelector('.container');
const userId = document.querySelector('.user-id');
const $logInput = document.querySelector('#login-input');
const logOut = document.querySelector('.logout');
const logoutDeleteModal = document.querySelector('.logout-delete-modal');

function onlyText() {
  let pattern = /[0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  this.value = this.value.replace(pattern, '');
}

let currentName

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  currentName = JSON.parse(localStorage.getItem('name')); //변수 currentName에 넣어서 localStorage에 뭐가있는지 보자

  nameValue = $logInput.value; //input값을 nameValue 변수에 저장하자

  currentName = nameValue; //input값을 localStorage에 넣자

  if (currentName === null || $logInput.value === "" || currentName.length > 6) { // localStorage에 key값이 비어있거나 입력값의 길이가 6이 넘었을 때
    test.classList.add('effect');
    setTimeout(()=>{
      test.classList.remove('effect');
    }, 500)
    return //실행취소
  }
  else if (currentName !== null) { // localStorage에 key값이 이미 들어있다면
    loginForm.classList.add('hidden');
    $form.classList.add('hidden'); 
    hiddenLogin.classList.remove('hidden'); //ui에 안보이게 처리하고
    userId.textContent = currentName; //input에 입력한 값을 ui에 뿌려주자
  }

  localStorage.setItem('name', JSON.stringify(nameValue));
  //localStorage에 데이터를 저장하자

})


//로그아웃 클릭시
function logOutBox() {
  logoutDeleteModal.classList.add('show');
}

logoutDeleteModal.addEventListener('click', (e) => {
  console.log(e.target);
  logoutDeleteModal.classList.add('show');
  if(e.target.className === 'logout-delete-bg' || e.target.id === 'logout-no-btn' || e.target.className === 'logout-delete-close'){
    logoutDeleteModal.classList.remove('show');
  }

  if(e.target.id === 'logout-yes-btn'){

    logoutDeleteModal.classList.remove('show');


    arr = [];
    filterList = [];

    //데이터 삭제
  localStorage.removeItem('name');
  localStorage.removeItem('list');
  //폼 숨기기
  loginForm.classList.remove('hidden');
  hiddenLogin.classList.add('hidden');
  $form.classList.remove('hidden');
  //데이터 초기화
  userId.textContent = "";
  $logInput.value = "";
  setTimeout(
    function () {
      $logInput.focus();
    }, 50);
    
  render();

  }
})


function init() {

  $logInput.style.width = '100%';
  
  setTimeout(
    function () {
      $logInput.focus();
    }, 50);

  let currentName = JSON.parse(localStorage.getItem('name'));
  
  if(currentName !== null){
    loginForm.classList.add('hidden');
    $form.classList.add('hidden');
    hiddenLogin.classList.remove('hidden');
  }
  userId.textContent = currentName; //값이 있다면 먼저 보여주자

  $logInput.addEventListener('keyup', onlyText);
  logOut.addEventListener('click', logOutBox);
}

init();