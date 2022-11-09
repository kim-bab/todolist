//input의 내용을 가져온다.
//add버튼을 누르면 화면에 input에 입력한 텍스트를 추가한다.
//엔터키를 누르면 화면에 input에 입력한 텍스트를 추가한다.
//랜덤아이디를 생성한다.
//각 리스트에 랜덤아이디를 부여해 존재를 구별한다.
//아이디로 구별하여 해당 리스트를 삭제한다.
//체크를 하면 isComplete는 true, 아니면 false
//'↑'를 클릭하면 num의 숫자가 하나씩 감소하면서 순서가 바뀐다.
//let order = arr.splice(from, 1)[0] (자기자신 값)과 arr.splice(to, 0, order)을 이용해 배열 순서를 바꾼다.

const container = document.querySelector('.container');
const addBtn = document.querySelector('.task_btn');
const inputText = document.querySelector('#text');
const profileImg = document.querySelector('.profile-img');
const inputDelete = document.querySelector('#xbtn');
const totalDelete = document.querySelector('#total-delete');

const tabs = document.querySelectorAll('.tab');
const all = document.querySelector('#all');
const done = document.querySelector('#done');
const taskAddModal = document.querySelector('.task_add_modal');
const addTaskModalBtn = document.querySelector('#btn');
let inputLength = document.querySelector('.input_length');


//편집기능
const taskEditModal = document.querySelector('.task_edit_modal');
const editText = document.querySelector('#edit_text');
const editTaskBtn = document.querySelector('.edit_task_btn');


//전체삭제 모달 변수
const modal = document.querySelector('.delete-modal');
const modalBg = document.querySelector('.delete-bg');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');


//날짜 변수
let isToday = new Date();

let date = isToday.getDate();
let day = isToday.getDay();

let weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let days = document.querySelector('.day');
let dates = document.querySelector('.date');



addBtn.addEventListener('click', addBtnBox);
inputText.addEventListener('click', inputEnterBox);



function init(){
  calrendarRender(); //달력

}

init();




//달력
function calrendarRender(){
  days.textContent = `${weeks[day]}`;
  dates.textContent = `${date < 10 ? '0'+date : date}`;
}



//할일 추가 이벤트리스너
addTaskModalBtn.addEventListener('click', () => {
  taskAddModal.classList.remove('hidden');
  setTimeout(
    function () {
      inputText.focus();
    }, 50);
})


//할일 추가 입력값 50이 넘으면 비활성화
inputText.addEventListener('keyup', () => {
  let valueLength = inputText.value.length;

  document.querySelector('#text').focus();


  if(valueLength > 50){
    addBtn.classList.add('btn-disabled');
    addBtn.disabled = true;
  }
  else{
    addBtn.classList.remove('btn-disabled');
    addBtn.disabled = false;
  }

  inputLength.textContent = valueLength;

});



//엔터키 활성화
function inputEnterBox(e) {
  if (e.keyCode === 13) {
    addBtnBox();
    // showLoginUser();
  }
}

// const profile = ['woman-1.png', 'man-1.png']

// //프로필 랜덤 사진 보여주기
// function profileRandomImg() {
//   let index = Math.floor(Math.random() * profile.length);

//   profileImg.innerHTML = `<img src="${profile[index]}" alt="">`;
// }

// profileRandomImg();



let arr = [];
let dataId = 'all';
let filterList = [];

//todolist 로컬스토리지 저장,출력 함수
function localCheck() {
  JSON.parse(localStorage.getItem('list'));//불러오기
  localStorage.setItem('list', JSON.stringify(arr));//저장하기
}

//각 아이디에 맞춰서 새배열에 필터를 해준다.
//all이면 render <-전체
//doing이면 check한 것만
//done이면 삭제한 것만

function render(id) {

  let list = [];


  // //화면 출력 시, 새로고침 시
  let localItem = JSON.parse(localStorage.getItem('list'));

  if (localItem == null) { //localStorage에 key값이 없다면
    arr = [];
  }
  else { //localStorage에 key값이 있다면
    arr = localItem; //arr에 input입력한, 입력했던 값을 보여주자
  }


  if (dataId == 'all') {
    let doList = arr.filter((test)=>{
      return test.isComplete == false;
    })
    
    list = doList;

  } else if (dataId == 'done') {
    list = filterList;
    
    list.forEach((items) => {
      if (id == items.id) { //랜덤아이디와 내가 클릭한 아이디가 같다면
        items.isComplete = !items.isComplete; //체크,안체크 스위치
      }
    })
  }
  
  
  let result = '';
  
  list.forEach((items) => {
    if (items.isComplete == true) { //체크할 때
      result += `<div class="list">
        <button class="list-btns" id="finish" onclick="checkList('${items.id}')"><i class="fa-solid fa-square-check"></i></button>
        <p id="items" class="end-list">${items.context}</p>
        <div class="checkBtns">
          <button id="delete" class="list-btns" onclick="deleteList('${items.id}')"></button>
          <button class="up" onclick="upBtn('${items.id}')"></button>
          </div>
        </div>`;
    }
    else if (items.isComplete == false) { //체크 안 할 때
      result += `<div class="list">
        <button id="check" class="list-btns" onclick="checkList('${items.id}')"><i class="fa-regular fa-square"></i></button>
          <p id="items">${items.context}</p>
          <div class="checkBtns">
            <button id="delete" class="list-btns" onclick="deleteList('${items.id}')"></button>
            <button class="up" onclick="upBtn('${items.id}')"></button>
          </div>
        </div>`;
    }
  })

document.querySelector(".list_box").innerHTML = result; //ui에 보여주자

  

  if (arr.length > 15) { //arr길이가 7이 넘는다면
    addBtn.removeEventListener('click', addBtnBox); //리스트 추가 이벤트를 삭제하자
    inputText.removeEventListener('keyup', inputEnterBox);
  }
  else {
    addBtn.addEventListener('click', addBtnBox); //리스트를 계속 추가하자
    inputText.addEventListener('keyup', inputEnterBox);
  }

  const tasks = arr.filter((items) => { //끝나지 않은 리스트 개수를 새서 하단에 표시해 주자
      return items.isComplete == false;
  })

  document.querySelector('.ing_task').textContent =  `${tasks.length} / ${arr.length}`;
}

render();



tabs.forEach((onTabs) => {
  onTabs.addEventListener('click', function (event) {
    filter(event);
  });
});


// window.addEventListener('resize', () => {
//   const absoluteTop = container.getBoundingClientRect();
//   console.log(absoluteTop);
//   const bodyHeight = document.body.getBoundingClientRect().height;
//   container.style.height = `${bodyHeight - absoluteTop.top - 70}px`;
// })


//편집..
// function editList(id){
//   arr.forEach((items) => {
//     if(items.id === id){
//       editText.value = items.context;
//       taskEditModal.classList.remove('hidden');
//       console.log(editText.value);
//       editTaskBtn.addEventListener('click', editBtn);
//     }
//   })
// }

// function editBtn(event) {
//   event.stopPropagation();
//   let test = JSON.parse(localStorage.getItem('list'));
//   let obj = items.context = editText.value;
//   localStorage.setItem('list', JSON.stringify(obj));
//   taskEditModal.classList.add('hidden');
//   console.log(JSON.parse(localStorage.getItem('list')));
// }


// taskEditModal.addEventListener('click', (e) => {
//   let targetId = e.target;

//   if(targetId.className === 'edit_task_modal_bg' || targetId.className === 'edit_task_xbtn'){
//     taskEditModal.classList.add('hidden');
//   }
// });


//추가버튼 클릭시
function addBtnBox() {
  const user = {
    id: randomID(),
    context: inputText.value,
    edit: false,
    isComplete: false
  }


  arr.push(user);
  inputLength.textContent = 0;
  inputText.value = "";
  localStorage.setItem('list', JSON.stringify(arr));//저장하기
  render();
  taskAddModal.classList.add('hidden');
}

taskAddModal.addEventListener('click', (e) => {
  let targetId = e.target;

  if(targetId.className === 'task_modal_bg' || targetId.className === 'task_xbtn'){
    taskAddModal.classList.add('hidden');
  }
})

//input값 삭제
inputDelete.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  inputText.value = '';
});


//전체 초기화
totalDelete.addEventListener('click', function() {
  modal.classList.add('show');
});


//전체삭제 확인여부 모달창
modal.addEventListener('click', (e) => {
  console.log(e.target);
  modal.classList.add('show');
  if(e.target.className === 'delete-bg' || e.target.id === 'no-btn' || e.target.className === 'delete-close'){
    modal.classList.remove('show');
  }

  if(e.target.id === 'yes-btn'){
    arr = [];
    filterList = [];

    localStorage.removeItem('list');
    console.log(arr,filterList);
    render();
    modal.classList.remove('show');
  }
})


//삭제버튼 클릭시
function deleteList(id) {

  arr.forEach((items) => {
    if (id == items.id) { //랜덤아이디와 내가 클릭한 아이디가 같다면
      let index = arr.indexOf(items); //클릭한 items이 몇번째에 있는지 변수에 저장한 후
      arr.splice(index, 1); //index부터 1만큼 삭제한다(자기자신 삭제)
    }
  })
  localCheck();
  filter();
}



//체크버튼 클릭시
function checkList(id) {

  arr.forEach((items) => {
    if (id == items.id) { //랜덤아이디와 내가 클릭한 아이디가 같다면
      items.isComplete = !items.isComplete; //체크,안체크 스위치
    }
  })

  localCheck();
  filter();
  
}



//순서변경 상위버튼 누르면
function upBtn(id) {

  arr.map((items) => {
    if (id == items.id) {
      console.log(id);
      let index = arr.indexOf(items); //true로 선택한 리스트가 몇번째에 있는지?!
      console.log("순서2: ", index);

      let num = index - 1;
      console.log("흠: ", num);
      if (index < 1) { //최소길이를 넘는다면 초기화
        index = 0;
        num = 0;
      }

      let itm = arr.splice(index, 1)[0];// 바꾸고 싶은 리스트 추출
      arr.splice(num, 0, itm); //num자리에 삭제는 없고 itm으로 이동한다.
    }
    return items
  })
  localCheck()
  render();
}



// //순서변경 하위버튼 누르면
// let num;
// function downBtn(id) {

//   for (let items of arr) {
//     if (id == items.id) {
//       console.log(id);
//       let index = arr.indexOf(items); //리스트 몇번째에 있는지?!
//       console.log("순서", num);


//       if (num >= arr.length - 1) { //최소길이를 넘는다면 초기화
//         num = arr.length - 1;
//       }

//       num = num - index;

//       let itm = arr.splice(index, 1)[0];// 바꾸고 싶은 리스트 추출
//       arr.splice(num, 0, itm); //num자리에, 삭제는 없고 itm으로 이동한다.
//     }
//     localCheck();
//     render();
//   }
// }



//리스트 필터하는 함수
function filter(event) {
  
  if (event) {
    dataId = event.target.id;
  }
  filterList = [];

  if (dataId == "all") { //all일 때
    document.querySelector('#done').classList.remove('choose');
    document.querySelector('#all').classList.add('choose');

    render();
  }
  else if (dataId == "done") { //done일 때
    document.querySelector('#all').classList.remove('choose');
    document.querySelector('#done').classList.add('choose');
    
    arr.filter((items) => { //arr에서 체크한 리스트만 모아서 새배열에 필터해주자
      if (items.isComplete == true) {
        filterList.push(items);
        return items
      }
    })
    
    render();
  }
}






//랜덤 아이디 생성 함수
function randomID() {
  return Math.random().toString(36).substr(2, 16);
}