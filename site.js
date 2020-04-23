var database = firebase.database();

function loopForm(form, name, phone) {
	var price = Number(0);
	var sandwichOrder = {salad : []};
	for (let child of document.getElementsByClassName("orderInput")) {
		if (child.type == "radio") {
			if (child.checked) {
				sandwichOrder[child.name] = child.value;
			}

			if (child.name == "bread_length" || child.name == "bread_type"  || child.name == "meat") {
				price += Number(child.dataset.price);
			}
		}

		if (child.type == "checkbox") {
			if (child.checked) {
				sandwichOrder.salad.push(child.value);
			}
		}
	}

	price = Math.round(price * 100)/100;
	sandwichOrder["price"] = price;
	OrderOutput.innerHTML = "";

	for (let key of Object.keys(sandwichOrder)) {
		OrderOutput.innerHTML += key + " : " + sandwichOrder[key] + "<br>";
	}

	OrderSummary.style.display = "block";

	sandwichOrder["phone"] = phone;


	//Write to firebase

	database.ref("sandwiches/"+name).set(sandwichOrder);


}

function validate() {
	if (name.value == "" || cellphone.value == "") {
		OutputError.innerHTML = "Please fill in this form";
		OutputError.style.display = "block";
		return;
	}
	if (document.getElementById("name").validity.valid && document.getElementById("cellphone").validity.valid) {
		OutputError.innerHTML = "";
		loopForm(document.getElementById("order"),
		 document.getElementById("name").value, 
		 document.getElementById("cellphone").value);
		OutputError.style.display = "none";

	} else {
		OutputError.innerHTML = "Please fill in this form correctly";
		OutputError.style.display = "block";
	}
}

function resetForm() {
	for (let child of document.getElementsByClassName("orderInput")) {
		if (child.checked) {
			child.checked = false;
		}
	}
}