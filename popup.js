console.log("start");

if (reqRun == undefined){
  var reqRun = 0;

  chrome.storage.sync.set({key0: reqRun}, function() {
  console.log('reqRunF is set to ' + reqRun);
  });
}

if (lastReqRun == undefined){
  var lastReqRun = 0;

  chrome.storage.sync.set({key5: lastReqRun}, function() {
  console.log('lastReqRun is set to ' + lastReqRun);
  });
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("click-this").addEventListener("click", run);
});
function run() {
  chrome.storage.sync.get(['key0'], function(reqRun) {
  let  reqRunF = reqRun.key0;



     let runCheck = "pass";

  chrome.storage.sync.set({key1: runCheck}, function() {
  });




    var intervalTime = 2000000;
    const stock = [];

    let upCaseStock = document.getElementById('Stock').value;

    stock[reqRunF] = upCaseStock.toUpperCase();
    var link = 'https://financialmodelingprep.com/api/v3/quote-short/' + stock[reqRunF] + '?apikey=2c338812fabec893abf6f7068f11decb';
    getRequest(
      link,
      drawOutput

    );


    setInterval(() => {
      getRequest(
        link,
        drawOutput

      );
    }, 1000 * intervalTime);
  });
  }





    function drawOutput(responseText) {
      chrome.storage.sync.get(['key0'], function(reqRun) {

        let  reqRunF = reqRun.key0;
        let percentage = [];
        let elements = [];
        let stock = [];
        let resp = [];
        let price = [];

        percentage[reqRunF] = document.getElementById('Percentage').value;
        let upCaseStock = document.getElementById('Stock').value;

        stock[reqRunF] = upCaseStock.toUpperCase();
        console.log(stock[reqRunF]);
        let respP = JSON.parse(responseText);
        resp[reqRunF] = JSON.parse(responseText);
        elements[reqRunF] = document.querySelectorAll('.stock-name')[0];
        price[reqRunF] =  respP[0].price;
        document.getElementById("PrtPrice").innerHTML = price[reqRunF];
        console.log(resp[reqRunF]);

        console.log(reqRunF);
        console.log(price[reqRunF]);

        console.log(stock[reqRunF]);


      chrome.storage.sync.set({key2: JSON.stringify(price)}, function() {


});
chrome.storage.sync.set({key3: JSON.stringify(percentage)}, function() {

});
chrome.storage.sync.set({key4: JSON.stringify(stock)}, function() {

});
});

}








function getRequest(url, success) {

  var req = false;
  try {
    req = new XMLHttpRequest();
  } catch (e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        return false;
      }
    }
  }
  if (!req) return false;
  if (typeof success != 'function') success = function() {};

  req.onreadystatechange  = function() {
    if (req.readyState == 4) {
      if (req.status === 200) {
        success(req.responseText)
      }
    }
  }
  req.open("GET", url, true);
  req.send(null);
  return req;
}
