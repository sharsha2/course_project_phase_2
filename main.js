//adding name to my to do list.
var h1 = document.createElement("H1");
var header = document.getElementsByTagName("header");
var text = document.createTextNode("MY TO DO LIST");
h1.appendChild(text);
header[0].appendChild(h1);



//store references to button, input, un-ordered list and body.
var button = document.getElementById("enter");
var input = document.getElementById("enterinput");
var ul = document.querySelector("ul");
var body = document.querySelector("body");


//referencing localstorage  and creating h3 element that displays local storage.
var storage_element = document.getElementById("localstorage");
var h3 = document.createElement('H3');
h3.appendChild(document.createTextNode("LOCAL STORAGE"));
storage_element.appendChild(h3);


//This function returns length of the input as entered by the user.
function inputlength() {
	return input.value.length;
}


//This function deletes the item that is selected for deletion.
function deleteButton(event) {
	let ele = event.target;

	//before the item is deleted, it is faded to red.
	ele.parentNode.style.color = "red";
	ele.parentNode.style.opacity = 0.7;

	//The faded item is visible for nearly 100ms and this is achieved using setTimeout function in javascript.
	setTimeout(function () {
		ele.parentNode.remove(ele);
	}, 100);

}


//If an item in the list is checked, this function produces a ding sound and strikes the checked item.
function checkItem(event) {
	let ele = event.target;
	if (ele.type === "checkbox") {
		if (ele.checked) {
			//selecting ding sound
			var ding = new Audio('ding.mp3');
			//playing ding sound when the item is checked.
			ding.play();

			//checked item is faded to green.
			ele.parentNode.style.color = "green";
			ele.parentNode.style.opacity = 0.6;
			//striking the item when it is checked.
			ele.parentNode.style.textDecoration = "line-through";

			//checked item is inserted at the bottom of the list.
			const root = ele.parentElement.parentElement;
			root.appendChild(ele.parentElement);
		}
	}
}



//This functions adds the to-do items in the list.
function create_list_element() {

	//creating delete button .
	var btn = document.createElement("button");
	//adding name to the button.
	btn.innerHTML = "Delete";
	//Assigning className to the button which is used in styling.
	btn.className = "delete";

	//creating input field of type checkbox for the item to be inserted.
	var inp = document.createElement("INPUT");
	inp.type = "checkbox";


	//creating a list item and appending a checkbox, input as entered by the user and delete option to the list item.
	var li = document.createElement("li");
	li.appendChild(inp);
	li.innerHTML = li.innerHTML + " ";
	li.appendChild(document.createTextNode(input.value));
	li.innerHTML = li.innerHTML + " ";
	li.appendChild(btn);


	//Browser API
	//generating random key t store the values in localStorage.
	let key = Math.floor((Math.random() * 100) + 1);

	//using localStorage api
	localStorage.setItem(key, input.value);

	//displaying to-do items stored in localStorage.
	let value = localStorage.getItem(key);
	let para = document.createElement('P');
	let data = document.createTextNode(value);
	para.appendChild(data);
	storage_element.appendChild(para);


	//A new item is always inserted at the top of the list.
	ul.insertBefore(li, ul.childNodes[0]);

	//once the user adds the item in the list the input field it is set to empty.
	input.value = "";

	//If an item in the list is checked it calls checkItem function.
	li.onclick = checkItem;

	//If delete button for an item is clicked, it calls deleteButton function.
	btn.onclick = deleteButton;
}


function addListAfterClick() {
	//if user adds an item by clicking on the add item button, the item add it to the list by calling create_list_element funtion.
	if (inputlength() > 0) {
		create_list_element();
	}
}


function addListAfterPress(event) {
	//if user adds an item by pressing enter key then add it to the list by calling create_list_element funtion.
	if (inputlength() > 0 && event.keyCode === 13) {
		create_list_element();
	}
}


//The funtion addListAfterClick gets activated when the user enters an item by clicking on the add item button.
button.addEventListener("click", addListAfterClick);

//The funtion addListAfterPress gets activated when the user enters an item by pressing an enter key.
input.addEventListener("keypress", addListAfterPress);

//Third-Party API
function initMap() {
	let home = {

		//Setting up the location.
		lat: 44.3935179,
		lng: -79.7147793
	};
	let mapSpot = document.getElementById('map');

	let map = new google.maps.Map(mapSpot, {
		zoom: 15,
		center: home
	});
	let marker = new google.maps.Marker({
		position: home,
		map: map
	});

}