var database = firebase.database();

function loopForm(form, name, phone) {
	var price = Number(0);
	var sandwichOrder = {salad : []};
	for (let child of form.elements) {
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
	orderOutput.innerHTML = "";

	for (let key of Object.keys(sandwichOrder)) {
		orderOutput.innerHTML += key + " : " + sandwichOrder[key] + "<br>";
	}
	sandwichOrder["phone"] = phone;


	//Write to firebase

	database.ref("sandwiches/"+name).set(sandwichOrder);


}

function validate() {
	if (name.value == "" || cellphone.value == "") {
		outputError.innerHTML = "Pleae fill in this form";
		return;
	}
	if (document.getElementById("name").validity.valid && document.getElementById("cellphone").validity.valid) {
		outputError.innerHTML = "";
		loopForm(document.order,
		 document.getElementById("name").value, 
		 document.getElementById("cellphone").value);

	} else {
		outputError.innerHTML = "Please fill in this form correctly";
	}
}