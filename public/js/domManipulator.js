var domManipulator = (function() {

  /*Private variable that is used to control Table rendering*/
  var TransactionInfo;

  var getTransactionInfo = function(){
    return TransactionInfo;
  };

  var getRenderPage = function(){
    return renderPage;
  };

  /*Stores the TransactionInfo so that transactions can be rendered*/
  var storeTransactionInfo = function(JSON){

    var pageArray = _(JSON.transactionList)
      .chunk(8)
      .value();

      var pageObject = new PageInfoObject(pageArray);

      TransactionInfo = pageObject;

      renderTable();

  };

  var setBtnLoadingState = function(){
    $('#submit-btn').button('loading');
  };

  var resetBtnLoadingState = function(){
    $('#submit-btn').button('reset');
  };

  /*All display methods are used control user interface messaging*/
  var displayAuthError = function(message) {
    $('#form-header').after("<div id='error-msg' class='text-center'><p>" + message + "</p></div>");
  };

  var displayAddError = function(message){
    $('.form-inline').before("<div id='error-msg' class='text-center'><p>" + message + "</p></div>");
  };

  var displayAddSuccess = function(message){
    $('.form-inline').before("<div id='success-msg' class='text-center'><p>" + message + "</p></div>");
  };

  var deleteInterfaceMessage = function(){
    $('#success-msg, #error-msg').remove();
  };
  
  var renderNoTransactions = function(){
    $('table').after('<div>There are no transactions associated with this account</div>')
  };

  /*Load Authentication partial*/
  var renderAuthLogin = function(){
    $('#app-container').load('public/partials/authLoginForm.html');
  };

  /*Used to render a specific Page of Transactions. Relies on Table Shell being loaded*/
  var renderPage = function(pageNumber){
    
    var targetFields = ['amount', 'cardName', 'created', 'merchant', 'receiptState', 'reimbursable'];

    if(TransactionInfo.transactionPageList.length > 0){
      var infoToDisplay = TransactionInfo.transactionPageList[pageNumber - 1];

      $(' tbody tr').remove();

      _.forEach(infoToDisplay, function(row){
        var $tablerow = $("<tr>");
        _.forEach(targetFields, function(field){
          $tablerow.append('<td>' + row[field]+ '</td>')
        });

        $('tbody').append($tablerow);
      });
    }else{
      renderNoTransactions();
    }
  };

  /*Controls the rendering of the entire table web page. Rendrers table shell, then pagecontroller, then add form*/
  var renderTable = function() {

    $('#app-container').load('public/partials/tableShell.html', function (response, status, xhr){

      if(status === 'error'){

      }else{
        /*Render page after Table shell is loaded in the DOM*/
        renderPage(1);
        $('#page-controller-wrapper').load('public/partials/pageController.html', function(response, status, xhr){
          if(status === 'error'){

          }else{
            /*Inintialize plugin after pageController is in the DOM*/
            utilities.initializePagination();
            $('input').attr("data-max-page", TransactionInfo.getMaxPages());
            $('#add-trans-wrapper').load('public/partials/addTransactionForm.html', function(response, status, xhr){
              if(status === 'error'){

              }else{
                utilities.initializeDatePicker();
                utilities.preventFormSubmission();
                utilities.preventUserInput();
              }
            });
          }
        });
      }
    });
  };

  return {
    displayAuthError: displayAuthError,
    displayAddError: displayAddError,
    displayAddSuccess: displayAddSuccess,
    deleteInterfaceMessage: deleteInterfaceMessage,
    renderAuthLogin: renderAuthLogin,
    storeTransactionInfo: storeTransactionInfo,
    setBtnLoadingState: setBtnLoadingState,
    resetBtnLoadingState: resetBtnLoadingState,
    getTransactionInfo: getTransactionInfo,
    getRenderPage: getRenderPage
  };
})();