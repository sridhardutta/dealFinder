WallmartDealSite = function(){

};

WallmartDealSite.prototype = {
  getDeals:  function(searchTerms, successFunction) {
    var self = this;
    $.ajax({
            url: 'http://www.walmart.com/msp?el=sponsored-carousel-container-ads&type=custom&theme=large&min=8&max=20&creative=1145x345_B-C-OG_TI_8-20_HL_MID_VOD&placementId=1145x345_B-C-OG_TI_8-20_HL_MID_VOD&platform=desktop&bucketId=&pageType=valueoftheday&pageId=0&keyword=home&customerId=2ADF2F9105192402-40001107A0007302&uid=207d77c1-ae11-44f3-bfdd-4935e2db1029&rviItems=39150766',
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