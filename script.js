// Assignment Code

// Catalina Manjarres Version 20121217-2000

// Global variables

var length=0;
var hasSpecialCharacters = false;
var hasNumericCharacters = false;
var hasLowerCasedCharacters = false;
var hasUpperCasedCharacters = false;

function lengthListener() {

  length = document.querySelector("#lengthInput").value;
    // Conditional statement to check if password length is a number. Prompts end if this evaluates false
    if (Number.isNaN(length)) {
      alert('Password length must be provided as a number');
      return null;
    }

  // Conditional statement to check if password length is at least 8 characters long. Prompts end if this evaluates false
  if (length < 8) {
    alert('Password length must be at least 8 characters');
    return null;
  }

  // Conditional statement to check if password length is less than 128 characters long. Prompts end if this evaluates false
  if (length > 128) {
    alert('Password length must less than 129 characters');
    return null;
  }

  showSection(".promptSpecial");
}

function specialListener(buttonId) {
  hasSpecialCharacters =  buttonId == "specialYesBtn";
  // next step
  showSection(".promptNumeric");
}

function numericListener(buttonId) {
  hasNumericCharacters =  buttonId == "numericYesBtn";
  // next step
  showSection(".promptLowercase");
}

function lowercaseListener(buttonId) {
  hasLowerCasedCharacters =  buttonId == "lowercaseYesBtn";
  // next step
  showSection(".promptUppercase");
}

function uppercaseListener(buttonId) {
  hasUpperCasedCharacters =  buttonId == "uppercaseYesBtn";

  // next step  
  writePassword();

  //hide criteria questions
  hideSection('.promptLength');
  hideSection('.promptSpecial');
  hideSection('.promptNumeric');
  hideSection('.promptLowercase');
  hideSection('.promptUppercase');

}

//
function showSection(className){
    //get a reference to the div element enclosing the entire section.
    var lengthElement = document.querySelector(className)
    //remove class "hide"  to show the section
    lengthElement.classList.remove( "hide");
}

//
function hideSection(className){
  //get a reference to the div element enclosing the entire section.
  var lengthElement = document.querySelector(className)
  //add class "hide"  to show the section
  lengthElement.classList.add( "hide");
}

// Write password to the #password input
function generateBtnListener() {
    //start cascaded display of the various prompts
    showSection(".promptLength");
}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", generateBtnListener);


// Write password to the #password input
function writePassword() {

  //generate password using all creiteria specified by the user.
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  //display generated password
  passwordText.value = password;

}

// Function to prompt user for password options
function getPasswordOptions() {
  
  // Conditional statement to check if user does not include any types of characters. Password generator ends if all four variables evaluate to false
  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowerCasedCharacters === false &&
    hasUpperCasedCharacters === false
  ) {
    alert('Must select at least one character type');
    return null;
  }

  
  // Object to store user input
  var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters,
  };

  return passwordOptions;
}


// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  // Variable to store password as it's being concatenated
  var result = [];

  // Array to store types of characters to include in password
  var possibleCharacters = [];

  // Array to contain one of each type of chosen character to ensure each will be used
  var guaranteedCharacters = [];

  // Check if an options object exists, if not exit the function
  if (!options) return null;

  // Conditional statement that adds array of special characters into array of possible characters based on user input
  // Push new random special character to guaranteedCharacters
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  // Conditional statement that adds array of numeric characters into array of possible characters based on user input
  // Push new random special character to guaranteedCharacters
  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  // Conditional statement that adds array of lowercase characters into array of possible characters based on user input
  // Push new random lower-cased character to guaranteedCharacters
  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  // Conditional statement that adds array of uppercase characters into array of possible characters based on user input
  // Push new random upper-cased character to guaranteedCharacters
  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  // For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);

    result.push(possibleCharacter);
  }

  // Mix in at least one of each guaranteed character in the result
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  // Transform the result into a string and pass into writePassword
  return result.join('');
}


// Function for getting a random element from an array
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}


// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.',
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];