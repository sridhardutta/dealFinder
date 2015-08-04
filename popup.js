var CurrencyConverter = {

      GetCurrencyDetails: function(){
          $.ajax({
              url: 'http://query.yahooapis.com/v1/public/yql',
              data:{"q":'select * from yahoo.finance.xchange where pair in ("USDINR")' , "format":"json", 'env':'store://datatables.org/alltableswithkeys', 
'callback':''}
          }).done(function(data){
              $("body").append($("<label></label").text("1 USD = " + data.query.results.rate.Rate + " INR"));
          }
          )
      },
	  GetXoomDetails: function(){
          $.ajax({
              url: 'https://www.xoom.com/ajax/options-xfer-amount-ajax',
              data:{'receiveCountryCode':'IN','sendAmount':100,r:Math.random()}
          }).done(function(data){
              $("body").append($("<div><label></label></div>").text("Xoom Rate: 1 USD = " + data.result.fxRate + " INR"));
          }
          )
      },
	  GetWellsFargoDetails: function(amount){
		  var reg = /1 USD = (.*?) INR/g;
          $.ajax({
              url: 'https://www.wellsfargo.com/as/grs/IN/12/ACCT_TO_ACCT/'+amount,
			  headers: {"Accept":"text/plain, */*; q=0.01","Referer":"https://www.wellsfargo.com/international-remittances/cost-estimator","X-Requested-With":"XMLHttpRequest"}
          }).done(function(data){
			  var ar = reg.exec(data);
              $("body").append($("<div><label></label></div>").text("WellsFargo Rate("+amount+"): 1 USD = " + ar[1] + " INR"));
          }
          )
      },
	  GetCraigListDetails: function(amount){
		  $.ajax({
              url: 'http://seattle.craigslist.org/search/ela/est?zoomToPosting=&catAbb=ela&query=%22iphone+5s%22&minAsk=100&maxAsk=600&excats=',
			  
          }).done(function(data){
			  $(data).find(".row").each(function(){
				$("body").append($(this));
			  });              
          }
          )
      }
  
};

DealSite = function(){
  this.urlFormat = "";
};

DealSite.prototype = {
  urlFormat: "",
  getDeals : function(searchTerms){

  },
  formatDeals : function(){

  },

  getUrl: function() {

  }
};


Deal = function(dealsTitle, dealsURL){
  this.dealsTitle = dealsTitle;
  this.dealsURL = dealsURL;
}

NotificationItem = function(title, message){
  this.title = title;
  this.message = message;
}
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have alredy been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    CurrencyConverter.GetCurrencyDetails();
  CurrencyConverter.GetXoomDetails();
  CurrencyConverter.GetWellsFargoDetails("1000");
  CurrencyConverter.GetWellsFargoDetails("5000");
  //CurrencyConverter.GetCraigListDetails();
  var site = new AmazonDealSite();
  site.getDeals(["pillow", "camera"], function(deals)
    {
      $("body").append($("<div style=\"color:red\">AMAZONDEALS:</div>"));
      for (var i = 0; i < deals.length; i++) {
        $("body").append($("<div><a href=\""+deals[i].dealsURL+"\">"+ deals[i].dealsTitle+"</a></div>"));
      };
      var items = []  
      for (var j = 0; j < deals.length; j++) {
        items.push(new NotificationItem(deals[j].dealsTitle, deals[j].dealsURL));
      };

});
  site = new WallmartDealSite();
  site.getDeals(["pillow", "camera"], function(deals)
    {
      $("body").append($("<div style=\"color:red\">WallMartDeals:</div>"));
      for (var i = 0; i < deals.length; i++) {
        $("body").append($("<div><a href=\""+deals[i].dealsURL+"\">"+ deals[i].dealsTitle+"</a></div>"));
      };
});
  site = new ebayDealSite();
  site.getDeals(["pillow", "camera"], function(deals)
    {
      $("body").append($("<div style=\"color:red\">ebay Deals:</div>"));
      for (var i = 0; i < deals.length; i++) {
        $("body").append($("<div><a href=\""+deals[i].dealsURL+"\">"+ deals[i].dealsTitle+"</a></div>"));
      };
});
  site = new TargetDealSite();
  site.getDeals(["pillow", "camera"], function(deals)
    {
      $("body").append($("<div style=\"color:red\">ebay Deals:</div>"));
      for (var i = 0; i < deals.length; i++) {
        $("body").append($("<div><a href=\""+deals[i].dealsURL+"\">"+ deals[i].dealsTitle+"</a></div>"));
      };
});
});