let xhttp = new XMLHttpRequest();

function calculatePrice() {
  // get the values from form
  let s = document.getElementById("salary").value;
  let d = document.getElementById("days").value;

  // ajax request
  url = "/calcprice?salary=" + s + "&days=" + d
  res = ""
  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      res = this.responseText;
      
      // parse json and get value
      parsed = JSON.parse(res)
      finalPrice = parsed["finalPrice"]
      console.log(finalPrice)

      // update page
      finalPriceRounded = Math.round(finalPrice / 50) * 50
      document.getElementById("finalPrice").innerHTML = finalPriceRounded;
    }
  }
  xhttp.send()
}

function storeQuote() {
  // get vals from form
  let n = document.getElementById("name").value;
  let s = document.getElementById("salary").value;
  let d = document.getElementById("days").value;

  // create obj for post request
  let postObj = {
    name: n,
    salary: s,
    days: d
  }

  // create url and execute ajax request
  url = "/storequote"
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      res = this.responseText
      
      // parse json and get value
      parsed = JSON.parse(res)
      finalPrice = parsed["finalPrice"]
      message = parsed["console"]
      console.log(message)

      // update page
      finalPriceRounded = Math.round(finalPrice / 50) * 50
      document.getElementById("finalPrice").innerHTML = finalPriceRounded;
    }
  }
  xhttp.send(JSON.stringify(postObj))
}