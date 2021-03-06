$(document).on("pagebeforeshow", "#menuPage", function() {
	$("#showMenu").text("");
	$("#showType").text("");
	$.getJSON("includes/readmenu.php", function(data){
		var dishType = [];
		var i;
		$.each(data, function(i, field){
			allDishType[i] = field.DishType;
			allPrice[i] = field.Price;
			allDishName[i] = field.DishName;
			allDishID[i] = field.DishID;
			allDishComposition = field.DishComposition;
        });
        i = 0;
        prevalue = null;
        $.each(allDishType, function(key, value) {
        	if (key == 0 || prevalue != value) {
        		dishType[i] = value;
        		i = i + 1;
        	}
        	prevalue = value;
        });
        $.each(dishType, function(key, value) {
        	$("#showType").append("<li><a class='ui-btn' id='dishType" + key + "'>" + value + "</a></li>");
        	$("#dishType" + key).click(function() {
        		$("#showMenu").text("");
        		$.each(allDishType, function(key1, value1) {
        			if (value1 == value) {
        				addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1]);
        			}
        		});
        	});
        });
	});
});

/*$(document).on("pageinit", "#menuPage", function() {
	$.getJSON("includes/readmenu.php", function(data){
		$.each(data, function(i, field){
			allDishType[i] = field.DishType;
			allDishName[i] = field.DishName;
			allPrice[i] = field.Price;

			listElement[i] = listMenu(field.DishID, field.DishName, field.Price);
			//$("#showMenu").append(listMenu(field.DishID, field.DishName, field.Price));
			$("#showMenu").append(listElement[i]);
			dishState(field.DishID);
			$("#dish" + field.DishID).click(function() {
				storeObject.DishID = field.DishID;
			});
			$("#dishPlus" + field.DishID).click(function() {
				plusMinusDish(field.DishID, "plus", "yes", "no");
			});
			$("#dishMinus" + field.DishID).click(function() {
				plusMinusDish(field.DishID, "minus", "yes", "no");
			});
        });
        i = 0;
        prevalue = null;
        $.each(allDishType, function(key, value) {
        	$("#showMenu").text("");
        	$("#showMenu").append(listElement[i]);
        	if (key == 0 || prevalue != value) {
        		dishType[i] = value;
        		alert(i);
        		$("#showType").append("<li><a class='ui-btn' id='dishType" + i + "'>" + value + "</a></li>");
        		$("#dishType" + i).click(function() {
        			$("#showMenu").text("");
        			alert(i);
        			$("#showMenu").append(listElement[i]);
        			//$.each(allDishType, function(key1, value1) {
        			//	if (value == dishType[i]) {
        			//		$("#showMenu").append(listElement[key]);
        			//	}
        			//});
        		});
        		i = i + 1;
        	}
        	prevalue = value;
        });
});*/

function addMenuDish(id, name, price) {
	$("#showMenu").append(listMenu(id, name, price));
	dishState(id);
	$("#dish" + id).click(function() {
		storeObject.DishID = id;
	});
	$("#dishPlus" + id).click(function() {
		plusMinusDish(id, "plus", "yes", "no");
	});
	$("#dishMinus" + id).click(function() {
		plusMinusDish(id, "minus", "yes", "no");
	});
}

function listMenu(id, name, price) {
	var list = "<li class='ui-li-has-alt' id='dishBlock" + id + "'>"
			 +   "<div class='ui-grid-a my-breakpoint'>"
			 +     "<div class='ui-block-a'>"
			 +       "<a id='dish" + id + "' href='#singlePage' class='ui-btn ui-mini' style='text-align:left; margin:0 0 0 0;' >"
			 +         "<h2>"+ name + "</h2>"
			 +         "<p>Price: &pound;" + price + " <span style='color:red' id='dishNum" + id + "'></span></p>"
			 +       "</a>"
			 +     "</div>"
			 +     "<div class='ui-block-b' style='height:100%'>"
			 +       "<div style='float:right;'>"
			 +         "<a id='dishMinus" + id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-corner-all'>Minus</a>"
			 +         "<a id='dishPlus" + id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-plus ui-corner-all'>Plus</a>"
			 +       "</div>"
			 +     "</div>"
			 +   "</div>"
			 + "</li>";
	return list;
}

function dishState(id) {
	$("#dish" + id).removeClass("ui-btn-active");
	$("#dishNum" + id).hide();
	$("#dishMinus" + id).hide();
	$.getJSON("includes/readselected.php", function(data) {
		$.each(data, function(i, field){
			if (field.DishID == id) {
				$("#dishNum" + id).show();
				$("#dishMinus" + id).show();
				$("#dishNum" + id).html("&times; " + field.DishNum);
				$("#dish" + id).addClass("ui-btn-active");
			}
		});
	});
}

function plusMinusDish(id, act, remove, del) {
	$.post("includes/plusminusdish.php",
	{
		DishID: id,
		action: act,
		remove: remove,
		del:    del
	},
	function(data) {
		$("#dishNum" + id).html("&times; " + data);
		if (data == 0) {
			$("#dish" + id).removeClass("ui-btn-active");
			$("#dishNum" + id).hide();
			$("#dishMinus" + id).hide();
		} else {
			$("#dish" + id).addClass("ui-btn-active");
			$("#dishNum" + id).show();
			$("#dishMinus" + id).show();
		}
	});
}