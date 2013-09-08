var previousFound = false;
var settingsJson = null;
var defaultJson = {"project_name": "SlideTip", 
				      "pitch_msg": "Like SlideTip, then show us some love by becoming a contributor. Every cent goes to improving SlideTip!", 
			  	        "min_val": 5, 
			  	        "max_val": 400, 
			  	      "start_val": 30, 
			  	   "paypal_email": "contribute@slidetip.com", 
			  	       "why_list": [{"value":0,  "message": "We need your support to make this happen!"},
			  	       				{"value":2,  "message": "send you X for helping out"},
			  	       				{"value":15, "message": "... and Y"},
			  	       				{"value":30, "message": "... and Z"},
			  	       				{"value":50, "message": "... and W"},
			  	       				{"value":75, "message": "... and X"},
			  	       				{"value":100, "message": "... and V"},
			  	       				{"value":200, "message": "... and U"},
			  	       				{"value":300, "message": "... and A"},
			  	       				{"value":400, "message": "... and B"}
			  	       			   ]
			  	  
};


settingsJson = {"project_name": "Saved Project", 
				      "pitch_msg": "Help me raise the funds I need!", 
			  	        "min_val": 10, 
			  	        "max_val": 600, 
			  	      "start_val": 20, 
			  	   "paypal_email": "help@me.com", 
			  	       "why_list": [{"value":0,  "message": "We need your support to make this happen!"},
			  	       				{"value":2,  "message": "send you X for helping out"},
			  	       				{"value":15, "message": "... and Y"},
			  	       				{"value":30, "message": "... and Z"},
			  	       				{"value":50, "message": "... and W"},
			  	       				{"value":75, "message": "... and X"},
			  	       				{"value":100, "message": "... and V"},
			  	       				{"value":200, "message": "... and U"},
			  	       				{"value":300, "message": "... and A"},
			  	       				{"value":400, "message": "... and B"}
			  	       			   ]
			  	  
};

window.onload=function() {
	
	if(!previousFound)
		loadSettings(defaultJson);
	else
		loadSettings(settingsJson);
	

	$( "#project_name, #pitch_msg, #min_val, #max_val, #start_val, #paypal_email" ).blur(function() {
		updatePreview();
		updateReasonWhy();
	});

};

var loadSettings = function(jsonObject){

	settingsJson = jsonObject;

	$("#project_name").val(jsonObject.project_name);
	$("#item_name").val(jsonObject.project_name);
	affName = jsonObject.project_name;
	$("#pitch_msg").val(jsonObject.pitch_msg);
	$("#min_val").val(jsonObject.min_val);
	$("#max_val").val(jsonObject.max_val);
	$("#start_val").val(jsonObject.start_val);
	$("#paypal_email").val(jsonObject.paypal_email);

	$("#whys_list").html(""); //= "";
	var whyListLength = jsonObject.why_list.length;
	for(var i = 0; i < whyListLength ; i++ ) {
		var div = document.createElement("div");
		div.className="why_item";
		div.id="whys_"+jsonObject.why_list[i].value;
		
		var input1   = document.createElement("input");
		input1.className = "why_item_amount";
		input1.onblur = function() { updatePreview(); updateReasonWhy();};
		input1.value = jsonObject.why_list[i].value;
		
		var input2   = document.createElement("input");
		input2.className = "why_item_message";
		input2.onblur = function() { updatePreview(); updateReasonWhy();};
		input2.value = jsonObject.why_list[i].message;

		var div2 = document.createElement("div");
		div2.className="why_delete_button";
		div2.id="delete_"+jsonObject.why_list[i].value;
		div2.onclick = function() { deleteWhy(this); };
		div2.value = jsonObject.why_list[i].value;

		$(div).append(input1);
		$(div).append(input2);
		$(div).append(div2);

		$("#whys_list").append(div);
	}


	var addDiv = document.createElement("div");
	addDiv.id="add_why_button";
	addDiv.innerHTML = "+ add a why value";
	addDiv.onclick = function() { addNewWhy(); };
	$("#whys_list").append(addDiv);

	

	updatePreview();

}


var updatePreview = function(){

	updateJsonValues();

	//document.getElementById("pay_pitch").innerHTML = settingsJson.pitch_msg;
	

	document.getElementById("paypal_email_form").value = settingsJson.paypal_email;


}

var updateJsonValues = function(){

	

	settingsJson.project_name = $("#project_name").val();
	affName = $("#project_name").val();
	
	settingsJson.pitch_msg = $("#pitch_msg").val();

	settingsJson.min_val = $("#min_val").val();
	settingsJson.max_val = $("#max_val").val();
	settingsJson.start_val = $("#start_val").val();
	settingsJson.paypal_email = $("#paypal_email").val();

	//console.log(settingsJson);
}

var addNewWhy = function(){
	
	//remove add button
	document.getElementById("add_why_button").remove();

	//add blank why
	var div = document.createElement("div");
	div.className="why_item";
	div.id="create_new_why";
	
	var input1   = document.createElement("input");
	input1.className = "why_item_amount";
	input1.onblur = function() { updatePreview(); updateReasonWhy();};
	input1.id = "new_item_amount"
	input1.value = "";
	
	var input2   = document.createElement("input");
	input2.className = "why_item_message";
	input2.onblur = function() { updatePreview(); updateReasonWhy();};
	input2.id = "new_item_message"
	input2.value = "";

	var div2 = document.createElement("div");
	div2.id="why_save_button";
	div2.onclick = function() { saveNewWhy(); };

	$(div).append(input1);
	$(div).append(input2);
	$(div).append(div2);

	$("#whys_list").append(div);

	

}


Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var saveNewWhy = function(){

	//check and save new why details to current session json
	if(document.getElementById("new_item_amount").value != ""){
		var div = document.createElement("div");
		div.className="why_item";
		div.id="whys_"+document.getElementById("new_item_amount").value;
		
		var input1   = document.createElement("input");
		input1.className = "why_item_amount";
		input1.onblur = function() { updatePreview(); updateReasonWhy();};
		input1.value = document.getElementById("new_item_amount").value;
		
		var input2   = document.createElement("input");
		input2.className = "why_item_message";
		input2.onblur = function() { updatePreview(); updateReasonWhy();};
		input2.value = document.getElementById("new_item_message").value;

		var div2 = document.createElement("div");
		div2.className="why_delete_button";
		div2.id="delete_"+document.getElementById("new_item_amount").value;
		div2.onclick = function() { deleteWhy(this); };
		div2.value = document.getElementById("new_item_amount").value;

		$(div).append(input1);
		$(div).append(input2);
		$(div).append(div2);


		

		//update local session json
		console.log(settingsJson.why_list.length);

		var newJsonObject = {"value" : document.getElementById("new_item_amount").value, 
		                   "message" : document.getElementById("new_item_message").value};
		settingsJson.why_list.push(newJsonObject);
		
		console.log(settingsJson.why_list);

		document.getElementById("create_new_why").remove();

		$("#whys_list").append(div);

		//readd add button to bottom
		var addDiv = document.createElement("div");
		addDiv.id="add_why_button";
		addDiv.innerHTML = "+ add a why value";
		addDiv.onclick = function() { addNewWhy(); };
		$("#whys_list").append(addDiv);


		updatePreview();
		updateReasonWhy();
	} else {
		alert("Amount must be zero or greater.");
		document.getElementById("new_item_amount").focus();
	}
	
}

var deleteWhy = function(valueToRemove){

	var parentId = valueToRemove.id;
	parentId = parentId.replace("delete","whys");
	document.getElementById(parentId).remove();
	//console.log(parentId);

	for(var i = 0; i < settingsJson.why_list.length; i++){

		var amount = valueToRemove.id;
		amount = amount.replace("delete_","")

		if(settingsJson.why_list[i].value == amount){
			//console.log(i);
			settingsJson.why_list.splice(i, 1);
		}

	}

	updatePreview();
	updateReasonWhy();
}


var updateReasonWhy = function(){

	//Clear gifts/whys list.
	document.getElementById("gift").innerHTML = "";

	//Add initial phrase.
	var span = document.createElement("span");
	span.innerHTML = "We'll ";
	document.getElementById("gift").appendChild(span);


	for(var i = 0; i < settingsJson.why_list.length; i++){

		if(settingsJson.why_list[i].value == 0){
			//document.getElementById("not-paying").innerHTML = ettingsJson.why_list[i].message;
		} else {
			var span = document.createElement("span");
			span.className = "why";
			$(span).attr( 'min', settingsJson.why_list[i].value );
			span.innerHTML = settingsJson.why_list[i].message;
			document.getElementById("gift").appendChild(span);
		}

	}

	onSliderChange();

}