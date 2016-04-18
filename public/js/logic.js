/*On page load checks for the cookie and gets transactions if the cookies are not present*/
$(function() {

  	var cookie = utilities.getCookie('authToken');

  	var isCookiePresent = cookie ? true : false;

  	if(!isCookiePresent){
		domManipulator.renderAuthLogin();
	}else{
		requestMaker.getTransactions();
	}
});

function submitAuthenticationForm(){
	
	domManipulator.deleteInterfaceMessage();
	domManipulator.setBtnLoadingState();

	var email = $('#email').val(),
	  	password = $('#pwd').val();

  	if(email && password){
	  requestMaker.authenticate(email, password);
	}else{
	  domManipulator.displayAuthError("Please make sure that you provide an email and password");
	}
}

function submitAddTransactionForm(){

	domManipulator.deleteInterfaceMessage();

	var amount = $('#amount-input').val(),
		merchant = $('#merchant-input').val(),
		created = $('#date-input').val();

	if(amount && merchant && created){
		requestMaker.addTransaction(created, merchant, amount);
	}else{
		domManipulator.displayAddError("Please make sure that you provide an amount, merchant, and date");
	}

	/*Used to prevent form submission*/
	return false;
}
