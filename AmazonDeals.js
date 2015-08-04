AmazonDealSite = function(){

};

AmazonDealSite.prototype = {
  getDealsMetadata: function(searchTerms, getDealDetails, successFunction) {
    $.ajax({
            url: 'http://www.amazon.com/xa/dealcontent/v2/GetDealMetadata?nocache=1438487295682',
            data: '{"requestMetadata":{"marketplaceID":"ATVPDKIKX0DER","customerID":"ADQNAG89ZJQSE","sessionID":"180-2822674-7422305","clientID":"goldbox"},"widgetContext":{"pageType":"GoldBox","subPageType":"main","deviceType":"pc","refRID":"01N2A9F07E3FMKHSX8H7","widgetID":"2134695082","slotName":"right-new-1"},"page":1,"dealsPerPage":1,"itemResponseSize":"NONE","queryProfile":{"featuredOnly":false,"dealTypes":["DEAL_OF_THE_DAY","LIGHTNING_DEAL"],"excludedExtendedFilters":{"MARKETING_ID":["restrictedcontent"]}}}',
            type: "POST",
          }).done(function(data){
            getDealDetails(data, searchTerms, successFunction);              
          }
          );
      },
    getDeals: function(searchTerms, successFunction) {
      this.getDealsMetadata(searchTerms, this.getDealDetails, successFunction);
    },
    getDealDetails: function(deals, searchTerms, successFunction){
      var matchingDeals = [];
      if (deals && deals.dealsByState && deals.dealsByState.AVAILABLE) { 
        var dealIds = [];
        for (var i = 0; i < deals.dealsByState.AVAILABLE.length; i++) {
          dealIds.push({"dealID": deals.dealsByState.AVAILABLE[i]});
        };
      };

      $.ajax({
            url: 'http://www.amazon.com/xa/dealcontent/v2/GetDeals?nocache=1438492732303',
            data: '{"requestMetadata":{"marketplaceID":"ATVPDKIKX0DER","clientID":"goldbox","sessionID":"180-2822674-7422305","customerID":"ADQNAG89ZJQSE"},"dealTargets":'+JSON.stringify(dealIds)+',"responseSize":"ALL","itemResponseSize":"NONE"}',
            type: "POST",
          }).done(function(data){
            console.log(data);
            if (data && data.dealDetails) {
              for (var property in data.dealDetails) {
                if (data.dealDetails.hasOwnProperty(property)) {
                    var currentDeal = data.dealDetails[property];
                    for (var j = 0; j < searchTerms.length; j++) {
                      if (currentDeal.description.toLowerCase().search(searchTerms[j].toLowerCase()) >=0 || currentDeal.title.toLowerCase().search(searchTerms[j].toLowerCase()) >=0) {
                      matchingDeals.push(new Deal(currentDeal.title, currentDeal.egressUrl));
                      break;
                    };
                    };
                    
                }
            }
            };
            successFunction(matchingDeals);
          }
          );

    }
  };