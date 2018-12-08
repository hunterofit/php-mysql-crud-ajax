
var data;
var allYear = []; 
var allCourse = ["All", "Computer system", "Software engineering", "Information communication", "Computer control", "Foreign language"]; 
var allBook = ["All", "Java learining", "Phython", "React.js studying", "English Grammar", "Programming", "Science"];
var lastid;

function onLoad(){    
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "getList.php", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {    
    if (this.readyState == 4 && this.status == 200) {   
        console.log(this.responseText);
        data = JSON.parse(this.responseText);
        console.log("aaa");
        makeTable();
        makeList();
    }
  };

//   if (document.cookie) {
//       var cookie = document.cookie;
//       document.getElementById("search").value = cookie;
//     //   updateSearchResult();
//   }
}

function makeList(){
    // var len = data.length;
    // for(var i = 0; i < len; i++){
    //     allYear.push(data[i]["year"]);
    //     allCourse.push(data[i]["course"]);
    //     allBook.push(data[i]["book"]);
    // }
    allYear.push("All");
    for(var i = 1900; i < 2100; i++){
        allYear.push(i);
    }
    var temp = "";
    for(var i = 0; i < allYear.length; i++){
        temp +="<option>" + allYear[i] + "</option>";
    }
    document.getElementById("year_list").innerHTML = temp;
    temp = "";
    for(var i = 0; i < allCourse.length; i++){
        temp +="<option>" + allCourse[i] + "</option>";
    }
    document.getElementById("course_list").innerHTML = temp;
    autocomplete(document.getElementById("search"), allBook);
}

function makeTable(){
    var tempStr = " ", len = data.length;
    var no = 0;
    for(var i = 0; i < len; i++){
        tempStr += "<tr id='" + data[i]['id'] + ":" + no + "'" + ">" + "<td>" + ++no + "</td><td>" + data[i]['year'] + "</td><td>" + data[i]['course'] + "</td><td>" + data[i]['book'] + 
            "</td><td>" + "<button type='button' name='edit' class='edit' onclick=clickEdit(this)>Edit</button>" + 
            "</td><td>" + "<button type='button' name='delete' class='delete' onclick=clickDelete(this)>Delete</button></td></tr>";
    }
    var tBody = document.getElementById('table_').tBodies[0];
    tBody.innerHTML = tempStr;
    // tBody.appendChild(document.createElement("<tr>"));
}

function clickEdit(element) {
    var rowElement = element.parentElement.parentElement;
    var tdElements = rowElement.childNodes;
    var tmp = rowElement.id;
    var id = tmp.split(":")[0];
    var index = tmp.split(":")[1];

    var replaceStr = "<td>" + ++index + "</td><td><input type='number' id='year_' value='" + tdElements[1].textContent + "' required/></td>" + 
       "<td><input type='text' id='course_' value='" + tdElements[2].textContent + "' required/></td>" + "<td><input type='text' id='book_' value='" + 
       tdElements[3].textContent + "' required/></td><td>" + "<button type='button' name='save' class='edit' onclick=clickSave(this)>Save</button></td><td>" +
        "<button type='button' name='delete' class='delete' onclick=clickDelete(this)>Delete</button></td>";
    rowElement.innerHTML = replaceStr;        
}

function clickSave(element){
    var rowElement = element.parentElement.parentElement;
    var tdElements = rowElement.childNodes;
    var tmp = rowElement.id;
    var id = tmp.split(":")[0];
    var index = tmp.split(":")[1];

    var year = tdElements[1].childNodes[0].value;
    var course = tdElements[2].childNodes[0].value;
    var book = tdElements[3].childNodes[0].value;
    saveToDB(id, year, course, book);
    var replaceStr = "<td>" + ++index + "</td><td>" + year + "</td><td>" + course + "</td><td>" + book + 
            "</td><td>" + "<button type='button' name='edit' class='edit' onclick=clickEdit(this)>Edit</button>" + 
            "</td><td>" + "<button type='button' name='delete' class='delete' onclick=clickDelete(this)>Delete</button></td>";
    rowElement.innerHTML = replaceStr;
}

function saveToDB(id, year, course, book){
    var data = new FormData();
    data.append('id', id);
    data.append('year', year);
    data.append('course', course);
    data.append('book', book);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save.php', true);
    // xhr.onload = function () {
    //     console.log(this.responseText);
    // };
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {    
            // lastid = this.responseText;
            // var tBody = document.getElementById('table_').tBodies[0];
            if(id == 0) onLoad(); // complete later.    
        }
    };
}

function addNew(){
    var id = 0, index = data.length;
    var tBody = document.getElementById('table_').tBodies[0];
    var appendStr = "<tr id='" + id + ":" + index + "'" + ">" + "<td>" + ++index + "</td><td><input type='number' id='year_' value=' ' required/></td>" + 
            "<td><input type='text' id='course_' value=' ' required/></td>" + "<td><input type='text' id='book_' value=' ' required/></td><td>" + 
            "<button type='button' name='save' class='edit' onclick=clickSave(this)>Save</button></td><td>" +
            "<button type='button' name='delete' class='delete' onclick=clickDelete(this)>Delete</button></td></tr>";    
    innerHTML = tBody.innerHTML + appendStr;
    tBody.innerHTML = innerHTML;
}

function clickDelete(element) {
    if(!confirm("Are you sure to delete this data?")) return;
    var rowElement = element.parentElement.parentElement;
    var tdElements = rowElement.childNodes;
    var tmp = rowElement.id;
    var id = tmp.split(":")[0];
    var index = tmp.split(":")[1];

    var data = new FormData();
    data.append('id', id);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete.php', true);    
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            onLoad();
        }
    };
}

function searchData(){          
    var yy = document.getElementById("year_list").value;
    var cc = document.getElementById("course_list").value;
    var bb = document.getElementById("search").value;
    console.log(yy+' '+cc+' '+bb);
    var len = data.length;
    var tempData = [];      
    for(var i = 0; i < len; i++){
        var year = yy == "All" ? true : data[i]['year'] == yy;
        var course = cc == "All" ? true : data[i]['course'] == cc;
        var book = data[i]['book'].toLowerCase().indexOf(bb.toLowerCase()) >= 0;
        if(year && course && book)
        {
            tempData.push(data[i]);
        }
    }
    data = tempData;
    makeTable();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "getList.php", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {    
            data = JSON.parse(this.responseText);
        }
    };
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  function onKeyPress(e) {
    // document.cookie = e.target.value;    
  }