//Rom and Clare 

// Global Variables

// Data Arrays
// These arrays hold data that's used in random generation functions, such as generatePeople() and nextDay(). They are declared globally so they're only created once, no matter how many times the other functions are called.
var colors = ["black", "blue", "red", "orange"];
var hobbies = ["games", "knitting", "outdoor activities", "self-improvement"];
var names = ["Clare", "Rom", "Scott", "Joseph", "Cody", "Kaitlin", "Mary", "Luke", "Brian", "Casey", "Michael", "Alicia", "Kelly", "Terry", "Jeanne", "Vince", "Aaron", "Michelle", "Steve", "Tracy", "Fred", "Mark"];
var moods = ["happy", "focused", "sleepy", "energized"];

// Holds all the Person() objects
var peopleArray = [];

// Counts the number of times nextDay() has been called
var day = 0;

// SETUP: We call generatePeople(20) to make 20 Person objects and store them in peopleArray. Then, we call nextDay() once to randomize everyone's moods and increment the day counter. After this, nextDay() can be called by a button on the document with an onclick property that calls nextDay(). (i.e. <button onclick="nextDay()">)
generatePeople(20);
nextDay();

function Person (name, hobby, favColor) {
	// Set properties of the object to the parameters passed in.
	this.name = name;
	this.hobby = hobby;
	this.favColor = favColor;
	// We set mood to happy to start off with, as it will be altered elsewhere in the code.
	this.mood = "happy";
	// changeMood accepts a mood (intended to be a string), which will then be set to the object's mood. Examples: "happy", "focused".
	this.changeMood = function(mood) {
		this.mood = mood;
	}
	// description returns a string with the person's likes and mood.
	this.description = function ( ){
		return this.name +" likes "+ this.hobby + " and the color " + this.favColor + ". Today, they are feeling " + this.mood + ".";
	}
}

//Randomly generate people
function generatePeople(numPeople) {
	// Loop through numPeople times
	for (var i = 0; i < numPeople; i++) {
		// Go through names consecutively; if i > names.length, start again at 0
		var nameChoice = names[i % names.length];
		// Get random choices from colors and hobbies, which are global arrays defined elsewhere. We use randomNumber(0, array length - 1) to get a number between the first and last index in the array, which will access a corresponding string of information.
		var colorChoice = colors[randomNumber(0, colors.length - 1)];
		var hobbyChoice = hobbies[randomNumber(0, hobbies.length - 1)];
		// Create a new person object from the random choices shown above
		var newPerson = new Person (nameChoice, hobbyChoice, colorChoice);
		// Push the new person to the people array
		peopleArray.push(newPerson);
	}
}

function nextDay () {
	// Increment day by 1
	day++;
	// Loop through people array, choosing a random mood in the same process used when choosing hobbies and colors for Person objects.
	for (i=0; i<peopleArray.length; i++) {
		var moodChoice = randomNumber(0, moods.length - 1);
		peopleArray[i].changeMood(moods[moodChoice]);
	}
	// Call displayPeople() to update the document that the user sees
	displayPeople();
}

// Displays everything in the document. Called by nextDay(), so it updates every time the day advances and objects are expected to change.
function displayPeople() {
	// From index.html, get the <h1> with an ID of day and the <ul> with an ID of people and store them in variables
	var header = document.getElementById("day");
	var list = document.getElementById("people");
	// Set the <h1> text to "Prime - Day X"
	header.innerHTML = "Prime - Day " + day;
	// Clear the list text and all child objects
	// We clear and rebuild this every day because people's moods will all change and it's easiest to start from scratch
	list.innerHTML = "";
	// Loop through all the people
	for (i = 0; i < peopleArray.length; i++) {
		// Create an empty <li> element that will hold one person's data
		var listItem = document.createElement("li");
		// Set the text of that <li> element to the person's description() function, which displays name, hobby, favorite color and current mood.
		listItem.innerHTML = peopleArray[i].description();
		// Add the <li> element to the inside of the <ul> element, below any <li> elements that may be above it.
		list.appendChild(listItem);
	}
}

//Utility function
//A simple random number generator
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}