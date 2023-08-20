let formData = document.querySelector(".formdata");
let contactlist = document.querySelector(".contactlist");
let searchfield  = document.querySelector(".searchfield");
let duplicateCheck = 0;
getDataFromLocal();
formData.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = e.target.fullname.value;
  let email = e.target.email.value;
  let phone = e.target.phone.value;
  // console.log(name,email,phone);
  let allData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  // this means if local storage has userdeatils key then get that or other wise send a blank array named userData.
  // first time it  get the key-- userDetails if no data found in local storage then send blank array but if key found Userdetails then send next data.
  // this is called null handle operator.
  for (let v of allData) {
    if (v.email === email || v.phone === phone) {
      duplicateCheck = 1;
      break;
    }
  }
  if (duplicateCheck == 1) {
    alert("email or phone already exists");
  } else {
    allData.push({
      name: name,
      email: email,
      phone: phone,
    });
    // console.log(userData);
    localStorage.setItem("userDetails", JSON.stringify(allData));
    e.target.reset();
  }
  getDataFromLocal();
});
function deleteData(index) {
  let allData = JSON.parse(localStorage.getItem("userDetails"));
    allData.splice(index, 1);
  localStorage.setItem("userDetails", JSON.stringify(allData));
  getDataFromLocal();

  // delete data
  // now again send data

  // window.location.reload();
  // after delete from local storage,remain items also shown on browser without call getDataFromLocal(); it will not directly the shown remain items on browser only refresh can shown data.
}
function getDataFromLocal() {
  contactlist.innerText = "No records found";
  let allData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  // this time get all data which is present in local storage display all data in browser page also
  let finalData = "";
  allData.forEach((element, index)=>{
    finalData += `
        <div class="items">
        <span onclick = "deleteData(${index})" class="delete">&times;</span>
            <h5>Name:</h5>
            <div>${element.name}</div><hr>
            <h5>Email:</h5>
            <div>${element.email}</div><hr>
            <h5>Number:</h5>
            <div>${element.phone}</div><hr>
        </div>
        `;
    contactlist.innerHTML = finalData;
  });
}
function clearALL() {
  if (confirm("are sure to delete all records ?") == true) {
    localStorage.clear("userDetails");
    contactlist.innerHTML = "all records deleted, refresh your page";
  }
}
function SearchContact() {
  let allData = JSON.parse(localStorage.getItem("userDetails"));
  let searchvalue = searchfield.value.trim();
  if (searchvalue.length >= 1) {
    let filterData = allData.filter((data) => {
      if (data.phone == searchvalue || data.name==searchvalue || data.email==searchvalue ) {
        return data;
      }
    });
    let finalData ="";
    filterData.forEach((element, index)=>{
      finalData += `
          <div class="items">
          <span onclick = "deleteData(${index})" class="delete">&times;</span>
              <h5>Name:</h5>
              <div>${element.name}</div><hr>
              <h5>Email:</h5>
              <div>${element.email}</div><hr>
              <h5>Number:</h5>
              <div>${element.phone}</div><hr>
          </div>
          `;
      contactlist.innerHTML = finalData;
    });
  }
}
// searchfield.addEventListener('input',(e)=>{
//   let searchvalue = e.target.value;
//   // console.log(e.target.value);
// const allData = JSON.parse(localStorage.getItem("userDetails"));
// if (!searchvalue) {
//   let filterData = allData.filter((data) => {
//     // console.log(data);
//     if (data.phone.includes(searchvalue) || data.name.includes(searchvalue) ) {
//       return data;
//     }
//   });
//   getDataFromLocal(filterData);
// }
// })

