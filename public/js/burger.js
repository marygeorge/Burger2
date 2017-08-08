$(document).ready(function(){

//console.log("Burger.js is ready");
var toeat = $("#toeat");
var eaten = $("#eaten");
var burgers;

$(document).on("click", ".deleteBurger", DeleteBurger);
$(document).on("click", ".eatBurger", EatBurger);

$(".newBurger").on("submit", addBurger);

showBurgersInDB();


function addBurger()
{
    event.preventDefault();
   // var burgerName=$("#bName").val().trim();
    var newB={
        name:$("#bName").val().trim()
    };
    $.post("/addNewBurger", newB, function() {
        $("#bName").val("");
      showBurgersInDB();
    });

}


function showBurgersInDB(){
    
    $.get("/burgers", function(data) {
        burgers = data;
        console.log("burgers: "+burgers.length);
        if (burgers || burgers.length) {
            showBurgers();
        }
    });

}

function DeleteBurger()
{
    var id = $(this).data("id");
    //console.log("deleting..."+id);
    $.ajax({
      method: "DELETE",
      url: "/delete/" + id
    })
    .done(function() {
      console.log("deleted from burger.js");
      showBurgersInDB();
    });
}

function EatBurger(){
var id = $(this).data("id");
    console.log("updating..."+id);
    $.ajax({
      method: "PUT",
      url: "/update/" + id
    })
    .done(function() {
      console.log("deleted from burger.js");
      showBurgersInDB();
    });
}

function showBurgers()
{
    //console.log("show burgers");
    toeat.empty();
    eaten.empty();
    for (var i = 0; i < burgers.length; i++) {
        //console.log(burgers[i])
        if(burgers[i].eaten)
        {  
            var row=$("<tr>");
            var col=$("<td>");
            var txt=$("<font>")
            txt.text(burgers[i].name);
            var but=$("<button>");
            but.addClass("deleteBurger");
            but.text("Remove");
            but.data("id",burgers[i].id);
            col.append(txt);
            col.append(but);
            row.append(col);
            // var html="";//"<form action='/delete/"+burgers[i].id+ "?_method=PUT' method='POST'>";
            //     html+="<tr><td><p>"+burgers[i].name+"</p></td>";
            //     html+= "<td>    <button type='submit' id='"+burgers[i].id+"' data='"+burgers[i].id+"'  class='deleteBurger'>Remove</button> </td></tr>";
            //     // html+="</form>";
             eaten.append(row); 
        }
        else
        { 
            var row=$("<tr>");
            var col=$("<td>");
            var txt=$("<font>")
            txt.text(burgers[i].name);
            var but=$("<button>");
            but.addClass("eatBurger");
            but.text("Eat");
            but.data("id",burgers[i].id);
            col.append(txt);
            col.append(but);
            row.append(col);
            toeat.append(row);
        }
    }
    
}


});





