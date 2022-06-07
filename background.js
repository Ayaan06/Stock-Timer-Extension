
let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: 'chrome://extensions/' })) {//   *://*/*
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file):/.test(info.url)) {
    keepAlive();
  }
}



if (reqRun == undefined){
  var reqRun = 0;

  chrome.storage.sync.set({key0: reqRun}, function() {

  });
}

if (lastReqRun == undefined){
  var lastReqRun = 0;

  chrome.storage.sync.set({key5: lastReqRun}, function() {
  });
}



var restartNum = 0;
// set var restartNum to 0
chrome.storage.sync.set({key6: restartNum}, function() {
});




startCheck();
function startCheck(){
chrome.storage.sync.get(['key1'], function(runCheck) {

if (runCheck.key1 == "pass"){
  let runCheck = "denied";
   chrome.storage.sync.set({key1: runCheck}, function() {
});
restart();
}
else {

  setTimeout(startCheck, 500);
}
});
}


function restart(){
  console.log("in restart");
chrome.storage.sync.get(['key0'], function(reqRun) {


  chrome.storage.sync.get(['key6'], function(restartNum) {


  chrome.storage.sync.get(['key5'], function(lastReqRun) {
    chrome.storage.sync.get(['key4'], function(stock) {

      chrome.storage.sync.get(['key2'], function(price) {
        chrome.storage.sync.get(['key3'], function(percentage) {
          let reqRunB = reqRun.key0;
          let stockB = JSON.parse(stock.key4);

          let percentageB = JSON.parse(percentage.key3);
          let priceB = JSON.parse(price.key2);
          let lastReqRun = reqRunB;
          console.log(reqRunB);



          reqRun = reqRunB + 1;
           chrome.storage.sync.set({key0: reqRun}, function() {
             console.log(reqRun + "updated       /");
          });

    check();






    restartNum.key6 + 1;
    chrome.storage.sync.set({key6: restartNum}, function() {
    });










      function check(){

        setTimeout(newPriceFunction, 10000);
      }


      function newPriceFunction(){


        var url = 'https://financialmodelingprep.com/api/v3/quote-short/' + stockB[reqRunB] + '?apikey=2c338812fabec893abf6f7068f11decb';
        getRequest(url);


}





function drawOutput(data) {
  console.log(data);

  let newPriceB = data[0].price;


      chrome.storage.sync.set({key5: (lastReqRun)}, function() {
      console.log('lastReqRun is set to ' + lastReqRun);
      });



        var diffrence = newPriceB - priceB;
        let PercentageVal = percentageB / 100 * priceB;


         if (diffrence > PercentageVal){
         // if (2>1){

           // send notification
           chrome.notifications.create('test', {
               type: 'basic',
               title: stockB + ' Timer',
               iconUrl: 'ImageEXP.jpg',
               message: stockB + " went over " + percentageB + " percent",
               priority: 2
           });



            }


        // else if (diffrence < PercentageVal){
        //
        //   // send notification
        //   chrome.notifications.create('test', {
        //       type: 'basic',
        //       title: stockB + ' Timer',
        //       iconUrl: 'ImageEXP.jpg',
        //       message: stockB + " went below " + percentageB + " percent",
        //       priority: 2
        //   });
        //
        //   // chrome.runtime.reload();
        //
        // }

        else {

          check();

        }
        reqRun = reqRunB + 1;
        chrome.storage.sync.set({key0: reqRun}, function() {
        });

        startCheck();


}//drawoutput


    function getRequest(url) {


      fetch(url)
    .then(response => response.json())
    .then(data => drawOutput(data));
    }

  });
  });
  });

});// lastReqRun
});//  restartNum
});// reqRun

}
