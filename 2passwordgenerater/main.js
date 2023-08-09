let upperchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerchars = "abcdefghijklmnopqrstuvwxyz";
let allnum = "0123456789";
let allsymbols = "!@#$%^&*()<>;:?{[}})(=+";

let password = document.getElementById("password");
let symbol = document.getElementById("symbol");
let number = document.getElementById("number");
let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let genBtn = document.getElementById("genBtn");
let passRange = document.getElementById("passRange");
let copyBtn = document.getElementById("copyBtn");
let para = document.getElementById("para");

passRange.addEventListener("change", function () {
  passValue.textContent = passRange.value;
  // passRange.value = passValue.textContent;---error comes in this line notice that left side who takes the value from someone
  //right side who gives value to left side
});

genBtn.addEventListener("click", function () {
  password.value = generatePassword(passRange.value);
  if (
    !number.checked &&
    !symbol.checked &&
    !uppercase.checked &&
    !lowercase.checked
  ) {
    alert("please select atleast one checkbox");
    return;
  }
});

function generatePassword() {
  let genPassword = "";
  let allChars = "";

  allChars += lowercase.checked ? lowerchars : "";
  allChars += uppercase.checked ? upperchars : "";
  allChars += number.checked ? allnum : "";
  allChars += symbol.checked ? allsymbols : "";

  for (let i = 1; i <= passRange.value; i++) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  return genPassword;
}
function copyPassword() {
  if (password.value != "" || password.value >= 1) {
    navigator.clipboard.writeText(password.value);
    alert("password copy !!!!!");
  }
}
