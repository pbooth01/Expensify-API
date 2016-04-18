var requestMaker = (function() {

  var displayError = function(error){
    domManipulator.displayAuthError(error);
  };

  var displayAddError = function(error){
    domManipulator.displayAddError(error);
  };

  var displayAddSuccess = function(message){
    domManipulator.displayAddSuccess(message);
  };

  var addTransaction = function(created, merchant, amount){
    $.get( "server/server.php", {command: 'addTransaction', created: created, merchant: merchant, amount: amount}, function( data ) {

        var info = JSON.parse(data);

        if(info.errorMsg){
          displayAddError(info.errorMsg);
        }else{
          displayAddSuccess('Your Transaction has been added successfully');
        }

      })
      .fail(function(err) {
        displayAddError("Internal Server Error :( We are taking a look at this momentarily!");
      });
  };

  var getTransactions = function() {

    $.get( "server/server.php", {command: 'transactions'}, function( data ) {

      var info = JSON.parse(data);

      if(info.errorMsg){
        displayAddError('There is an error processing your transactions');
      }else{
        domManipulator.storeTransactionInfo(info);
      }

    })
      .fail(function(err) {
        displayAddError("Internal Server Error :( We are taking a look at this momentarily!");
      });
  };

  var authenticateUser = function(email, password) {

    $.get( "server/server.php", {command: 'authenticate', username: email, password: password}, function( data ) {

      var info = JSON.parse(data);
      domManipulator.resetBtnLoadingState();

      if(info.errorMsg){
        displayError(info.errorMsg);
      }else{
        getTransactions();
      }

    })
      .fail(function(err) {
        displayError("Internal Server Error :( We are taking a look at this momentarily!");
        domManipulator.resetBtnLoadingState();
      });
  };

  return {
    authenticate: authenticateUser,
    getTransactions: getTransactions,
    addTransaction: addTransaction
  };
})();