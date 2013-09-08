var minAmount = 5;
var maxAmount = 400;

var paymentTracking = function() {
    var timestampYear  = new Date().getUTCFullYear();
    var timestampMonth = new Date().getUTCMonth();
    var timestampDay   = new Date().getUTCDate();
    var timestampHour  = new Date().getUTCHours();
    var timestampMin   = new Date().getUTCMinutes();
    var timestampSec   = new Date().getUTCSeconds();
    var timestampMil   = new Date().getUTCMilliseconds();
            	
    var timestamp = "" + timestampYear + timestampMonth + timestampDay + timestampHour + timestampMin + timestampSec + timestampMil;
            	
    //alert(timestamp);
    var val = $("#slider").val();

    var dollars = Math.min(Math.pow(val/minAmount, 2) + minAmount, maxAmount);
            	
    if (val == 0) dollars = 0;
    var roundTo = (dollars <= 10 ? 1 : dollars <= 150 ? minAmount : 25);
	  dollars = Math.floor(dollars / roundTo) * roundTo;
	            
    var amtString = dollars + ".00";
            	
    //alert(amtString);
            	
    var affName = "SlideTip.com";
    var tracking = affName;
    var pageTracker = _gat._getTracker("UA-39500794-1");
    try{
  					
  		pageTracker._trackPageview();
  		pageTracker._addTrans(
    	timestamp,            // transaction ID - required
   		  affName,       // affiliation or store name
      	amtString,          // total - required
      	"0.00",             // tax
      	"0.00"//,           // shipping
      	//"San Jose",       // city
      	//"California",     // state or province
      	//"USA"             // country
    	);


   		// add item might be called for every item in the shopping cart
   		// where your ecommerce engine loops through each item in the cart and
   		// prints out _addItem for each 
   		pageTracker._addItem(
   		"1234",           // transaction ID - necessary to associate item with transaction
   		tracking,           // SKU/code - required
   		"Contribution",        // product name
   		amtString,   // category or variation
   		amtString,        // unit price - required
   		"1"               // quantity - required
   	);

   	pageTracker._trackTrans(); //submits transaction to the Analytics servers
	} catch(err) { }
    pageTracker = _gat._getTracker("UA-39500794-1");
    try{
  					
  		pageTracker._trackPageview();
  		pageTracker._addTrans(
    	timestamp,            // transaction ID - required
   		affName,  			// affiliation or store name
      	amtString,           // total - required
      	"0.00",            // tax
      	"0.00"//,           // shipping
      	//"San Jose",        // city
      	//"California",      // state or province
      	//"USA"              // country
    	);


   		// add item might be called for every item in the shopping cart
   		// where your ecommerce engine loops through each item in the cart and
   		// prints out _addItem for each 
   		pageTracker._addItem(
   		"1234",           // transaction ID - necessary to associate item with transaction
   		tracking,           // SKU/code - required
   		"Contribution",        // product name
   		amtString,   // category or variation
   		amtString,        // unit price - required
   		"1"               // quantity - required
   	);

   	pageTracker._trackTrans(); //submits transaction to the Analytics servers
	} catch(err) { }
};


// function recordTracking() {
//     var tracking = affName;
//     //$('#google-form [name="shopping-cart.merchant-private-data"]').val(tracking);
//     $('#paypal-form [name="item_number"]').val(tracking);
//     //$('#amazon-form [name="referenceId"]').val(tracking);
// };
// recordTracking();
            
// Update the slider UI and maybe plead with the user not to pay $0
function onSliderChange() {
    var zero = ($("#slider").val() == 0);
    $("#not-paying").toggle(zero);
    $("#payment-types").toggle(!zero);
    $("#gift").toggle(!zero);

    updateAmountFromSlider();
}
// On slider change, adjust printed dollar value and position,
// and update gift list



function updateAmountFromSlider() {
    var here = $("#pay_main");
    var val = $("#slider").val();
    var offset = val / 100 * ($("#paySlider").width() - 25);

    // Increasing speed from $2 to $400, but allowing $0
    var dollars = Math.min(Math.pow(val/minAmount, 2) + minAmount, maxAmount);
    if (val == 0) dollars = 0;
    


    var roundTo = (dollars <= 10 ? 1 : dollars <= 150 ? minAmount : 25);



    dollars = Math.floor(dollars / roundTo) * roundTo;
    here.find('#amt-text').css({"padding-left": offset});
    here.find('#amt-text-num').text(dollars);

    here.find(".why").each(function(el) {
    $(this).toggle($(this).attr("min") <= dollars);
    });

    var amtString = dollars + ".00";
    //$('#google-form [name="item_price_1"]').val(amtString);
    $('#paypal-form [name="amount"]').val(amtString);
    //$('#paypal-form2 [name="a3"]').val(amtString);
    //$('#amazon-form [name="amount"]').val("USD " + dollars);
              
    
              	
	  //$('#amazon-form [name="signature"]').val(amazonSig);
			  
}
$("#pay_main").find('input').change(onSliderChange);
onSliderChange(); // set amount from default slider position

var forcedAmount = parseFloat((document.location.search.match(/(?:[?&])amt=([0-9.]*)/) || {})[1]);
if (forcedAmount > maxAmount) {
    $("#slider").val(100);
    onSliderChange();
    var dollars = forcedAmount + ".00";
    $("#amt-text-num").text(forcedAmount);
    //$('#google-form [name="item_price_1"]').val(dollars);
    $('#paypal-form [name="amount"]').val(dollars);
    //$('#paypal-form2 [name="a3"]').val(dollars);
    //$('#amazon-form [name="amount"]').val("USD " + forcedAmount);
}


// Safari bug: click a button to submit a form, close the newly opened window
// using your mouse (not keyboard), try to click the button again: nothing happens.
// Any button submitting a form to the same URL won't work.  Workaround: modify the
// URL harmlessly after onclick, so any later clicks are to a new URL.
$('form input[type="image"]').click(function() {
var that = this;
window.setTimeout(function() {
    var theForm = $(that).closest("form")[0];
    if (!/\?/.test(theForm.action))
    theForm.action += "?";
    theForm.action += "&";
}, 0);
});

// Confirm if they leave without paying
GLOBAL_haveClickedPayButton = false;
window.onbeforeunload = function() { 

};
$('form input[type="image"]').click(function() {
GLOBAL_haveClickedPayButton = true;
paymentTracking();
});




$(function () {
    $("#paySlider").on("change", function (e, val) {
        // e is event
        // val is current value

        //percentTime = val;
        //console.log(val);

        document.getElementById("slider").value = val;
        updateAmountFromSlider();
        onSliderChange();
    });

    $("#paySlider").on("changed", function (e, val) {
        // e is event
        // val is current value
        //consoleLog(val);
    });

    // for retrieve a current value you can call
    $("#paySlider").data('value');
})

