$(document).ready(main);


function main(){
  //Strip stuff

	//--Control Flow------------------------------------------


	//run code for the listeners for the mattress product
	mattress_price_code();
	//Default active buttons and selections when page loads
	$('#button-king').trigger('click');
    
    //load the video modal
    autoPlayYouTubeModal();
    //Scrollspy for index.html
    $('body').scrollspy({target: '#myNavbar'});
    //--------------------------------------------------------

    //-----------------code from codepen.io -----------------------------------------

  //Global varialbes - variables that are always listening------------------------- 
  itemName= undefined;
  itemType = undefined;
  itemQuantity= undefined;
  orderCount=0; //used to keep track of items in the shoppingCartArray
  totalPrice=0; //used to checkout
  totalQuantity=0; //used to checkout
  totalTax=0; //used to checkout
  
    // Define an Object/Class like this
    /* objItem will model an item on a shopping car, this time will represent and individual order.
    	-Name can be either mattress, diffuser, or essential oils
    	-Type only applies to mattress, can be either: king, queen, twin, etc.
    	-Quantity is the quantity
    	-price is set dynamically depending on , name, type, and quantity.
   	*/
	function objItem(name, type, quantity, price){
   		// Add object properties like this
   		this.name = name;
   		this.type = type;
   		this.quantity = quantity;
   		this.price = price;
	}

  //shoppingCartArray models a shopping cart with 50 blank objects	
  //initialize the shopping cart with 50 objItem objects.
  //Each object represents an individual order 
  shoppingCartArray = [];
  
  for (i = 0; i<50; i++){
    shoppingCartArray.push(new objItem());
  }
  //-----------------End of variable declarations---------------------------------------//

  //------------functions --------------------------------------------------------------//
function printShoppingCart(){
      //clear off the fields before append all the cart elements
      $('#htmlItemNameSC').html("Item Name");
      $('#htmlItemQuantitySC').html("Item Quantity");
      $('#htmlItemPriceSC').html("Item Price");
      $('#htmlItemRemove').html("Remove")
  
  totalPrice = 0; //reset total price so cart updates correctly
  for (i =0; i < orderCount; i++){
    if (shoppingCartArray[i].type != undefined){
      $('#htmlItemNameSC').append("<p>" + shoppingCartArray[i].name + " - " + shoppingCartArray[i].type + "</p>" );
    }
    else {
            $('#htmlItemNameSC').append("<p>" + shoppingCartArray[i].name + "</p>" );
    }
      $('#htmlItemQuantitySC').append("<p>" + shoppingCartArray[i].quantity + "<p>");
      $('#htmlItemPriceSC').append("<p>" + shoppingCartArray[i].price + "</p>");
  //---Dinamically Create buttons to remove items
    //append a <p> tage to separate buttons
    jQuery('<p></p>').appendTo("#htmlItemRemove")
    //append the actual buttons
    jQuery('<button></button>', {
    id: i.toString(),
    text: "remove" , 
    click: function(){
      //use the id of the button to remove element in array
      shoppingCartArray.splice(Number(this.id), 1);
     //update orderCount global variable
      orderCount--;
      printShoppingCart();
    }}).appendTo('#htmlItemRemove');
     //totals
     totalPrice = totalPrice + shoppingCartArray[i].price;

     
  }//end of for loop
  
  //update final price and tax variables
  if (orderCount>0){
     $('#htmlTotalPrice').html(totalPrice);
     }
     else {
      $('#htmlTotalPrice').html("");

     }
}
  //---------end of functions --------------//
    //-----------------Button Listeners-all buttons go here-------------------------------- 
  //Submit mattress order
  $('#button_addtocart_mattress').click(function(){

    //get mattress quantity
    itemQuantity = document.getElementById('input_mattress_quantity').value;
    //logic to see if mattress type, quantity have been selected
    if(itemName === "Mattress" && itemType != undefined && itemQuantity >0){
      shoppingCartArray[orderCount].name=itemName;
      shoppingCartArray[orderCount].type=itemType;
      shoppingCartArray[orderCount].quantity=itemQuantity;
      switch(itemType) {
        case "Twin":
          shoppingCartArray[orderCount].price = 500 * itemQuantity;
          break;
        case "Queen":
          shoppingCartArray[orderCount].price = 750 * itemQuantity;
          break;
        case "King":
          shoppingCartArray[orderCount].price = 950 * itemQuantity;
          break;
        case "Cal King":
          shoppingCartArray[orderCount].price = 950 * itemQuantity;
          break;
        case "Full":
          shoppingCartArray[orderCount].price = 750 * itemQuantity;
          break;
        default:
          break;
                     }
         //update orderCount
         orderCount++;
        //update variables to empty
        itemName = undefined;
        itemType = undefined;
        itemQuantity= undefined;
        console.log("addtocart mattress pressed");

      printShoppingCart();
    }
  });
$('#button_addtocart_diffuser').click(function(){
  itemName = "Diffuser";
  itemQuantity = document.getElementById('input_diffuser_quantity').value;
  if (itemQuantity > 0)
  {
    shoppingCartArray[orderCount].name=itemName;
    shoppingCartArray[orderCount].quantity=itemQuantity;
    shoppingCartArray[orderCount].price = itemQuantity*60;
  }
    orderCount++;
     itemName = undefined;
        itemType = undefined;
        itemQuantity= undefined;
        console.log("addtocart diffuser pressed");
        printShoppingCart();

});

$('#button_addtocart_oil').click(function(){
  itemName="Essential Oils";
  itemQuantity = document.getElementById('input_oil_quantity').value;
  if (itemQuantity >0){
    shoppingCartArray[orderCount].name=itemName;
    shoppingCartArray[orderCount].quantity=itemQuantity;
    shoppingCartArray[orderCount].price = 20 * itemQuantity;
  }
  orderCount++;
     itemName = undefined;
        itemType = undefined;
        itemQuantity= undefined;
        console.log("addtocart oil pressed");
        printShoppingCart();
});
  $('#button_DiffuserItemButton').click(function(){
      $('#htmlMattressButtons').hide();
    $('#itemTitle').html("<h2> AromaMist Diffuser </h2>");
    itemName="Diffuser";
    itemType=undefined;
    
  });
    $('#button_OilItemButton').click(function(){
        $('#htmlMattressButtons').hide();
    $('#itemTitle').html("<h2> Essential Oils </h2>");
     itemName='Oil';
     itemType= undefined;
  });
    //--------------------------------------------------

}

//funtion to update the prices of the mattress when buttons are clicked--------------

function mattress_price_code(){



	$('#button-twin').on('click', function(){
		$('.price_field_mattress').text('$500');
		$('.mattress_dimensions').html( '<strong style=\"font-size: 16px\">Dimensions:</strong> 39” X 75” X 11"');
    itemType="Twin";
    itemName="Mattress";
    //Debugging code below:
    console.log(itemName + itemType);


	});

	$('#button-full').on('click', function(){
		$('.price_field_mattress').text('$750');
		$('.mattress_dimensions').html( '<strong style=\"font-size: 16px\">Dimensions:</strong> 54” X 75” X 11"');
        itemName="Mattress";
        itemType="Full";

	});

	$('#button-queen').on('click', function(){
		$('.price_field_mattress').text('$850');
		$('.mattress_dimensions').html( '<strong style=\"font-size: 16px\">Dimensions:</strong> 60” X 80” 	X 11"');
    itemType="Queen";
    itemName="Mattress";


	});

	$('#button-king').on('click', function(){
		$('.price_field_mattress').text('$950');
		$('.mattress_dimensions').html( '<strong style=\"font-size: 16px\">Dimensions:</strong> 76” X 80” X 11"');
        itemType="King";
    itemName="Mattress";



	});

	$('#button-calking').on('click', function(){
		$('.price_field_mattress').text('$950');
		$('.mattress_dimensions').html( '<strong style=\"font-size: 16px\">Dimensions:</strong> 72” X 84” X 11"');
    itemName="Mattress";
    itemType="Cal King";


	});
/*
	$('#button_addtocart_mattress').on('click', function(){
		if (mattress_selection === undefined){
		}
		else{
		alert(mattress_selection);
	}
	});
*/
}//---------------End of mattress_price_code()------------------------------


//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG -------------
//Credit to stackoverflow.com
function autoPlayYouTubeModal(){
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function() {
        var theModal = $(this).data( "target" ),
            videoSRC = $(this).attr( "data-theVideo" ),
            videoSRCauto = videoSRC+"?autoplay=1" ;
        $(theModal+' iframe').attr('src', videoSRCauto);
        $(theModal+' button.close').click(function () {
            $(theModal+' iframe').attr('src', videoSRC);
        });

        $(theModal).on('hidden.bs.modal', function () {
            $(theModal+' iframe').attr('src', videoSRC);
        });
    });
}//----------End of autoPlayYouTubeModal()--------------------------------

//--Implementation of shopping cart by oscar on Codepen.io -->
/*
  $('#button_submit_mattress_quantity').click(function() {
    //get itemQuantity from input field
        itemQuantity = document.getElementById('input_mattress_quantity').value;    
    //logic to check if the 3 fields are not empty to add a mattress,
    if(itemName === "Mattress" && itemType != undefined && itemQuantity > 0){ 
      //logic to check what type it is and then update price               accordingly
      shoppingCartArray[orderCount].name=itemName;
      shoppingCartArray[orderCount].type=itemType;
      shoppingCartArray[orderCount].quantity=itemQuantity;
      switch(itemType) {
        case "twin":
          shoppingCartArray[orderCount].price = 500;
          break;
        case "queen":
          shoppingCartArray[orderCount].price = 750;
          break;
        case "king":
          shoppingCartArray[orderCount].price = 900;
          break;
        default:
          break;
                     }
         //update orderCount
         orderCount++;
        //update variables to empty
        itemName = undefined;
        itemType = undefined;
        itemQuantity= undefined;
      printShoppingCart();
    } //end of if statement
    // test logic to see name and quantity to add diffuser and oil
    else if ( itemName != undefined && itemQuantity > 0){
      shoppingCartArray[orderCount].name=itemName;
      shoppingCartArray[orderCount].type=itemType;
      shoppingCartArray[orderCount].quantity=itemQuantity;
      //logic to test to see if its either a diffuser or oil
      if (itemName==="Diffuser"){
         shoppingCartArray[orderCount].price = 60;
        //update orderCount
         orderCount++;
        //update variables to empty
        itemName = undefined;
        itemType = undefined;
        itemQuantity= undefined;
        printShoppingCart();
      }
      else { //its oil
        shoppingCartArray[orderCount].price = 20;          
          //update orderCount
         orderCount++;     
        //update variables to empty
        itemName = undefined;
        itemType = undefined;
        itemQuantity= undefined;                         printShoppingCart();

      }
    }
    else {   //Do nothing  
    }
    });
*/
    
/*Complete
  $('#button_king').click(function(){
    itemType="king";
  });
    $('#button_queen').click(function(){
    itemType="queen";
  });
    $('#button_twin').click(function(){
    itemType="twin";
  });
*/
/*
  $('#button_MattressItemButton').click(function(){
    //$('#itemTitle').html("<h2> My Gel Mattress </h2>");
    itemName="Mattress";
      //$('#htmlMattressButtons').show();
  });
*/