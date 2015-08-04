TargetDealSite = function(){

};

TargetDealSite.prototype = {
  getDeals:  function(searchTerms, successFunction) {
    var self = this;
    $.ajax({
            url: 'http://coupons.target.com/',
            type: "GET",
          }).done(function(data){
            self.parseAndSearchDeals(data, searchTerms, successFunction);              
          }
          );
      },
  parseAndSearchDeals : function(html, searchTerms, successFunction) {
    if (html) {
      var matchingDeals = []
      var $html = $(html);  
      var deals = $html.find(".js-tile-heading")
      for (var i = 0; i < deals.size(); i++) {
        var currentDeal = deals.get(i);
        for (var j = 0; j < searchTerms.length; j++) {
          if (currentDeal && currentDeal.innerText && currentDeal.innerText.toLowerCase().search(searchTerms[j].toLowerCase()) >=0) 
          {
              matchingDeals.push(new Deal(currentDeal.innerText, currentDeal.getAttribute("href")));
              break;
          };
        };
      };

      successFunction(matchingDeals);
    };
  }

  };