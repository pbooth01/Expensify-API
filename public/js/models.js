/*Model is used to define the Transaction info object*/
var PageInfoObject = function(transactionInfo){
  this.transactionPageList = transactionInfo;
  this.maxPages = transactionInfo.length;
};

PageInfoObject.prototype.getMaxPages = function(){
  return this.maxPages;
}