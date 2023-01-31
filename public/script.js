var xhttp = new XMLHttpRequest();

function calculatePrice() {
  // get the values from form
  var s = document.getElementById("salary").value;
  var d = document.getElementById("days").value;

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