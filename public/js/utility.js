/*Various helper functions that I couldn't think to place somewhere else*/
var utilities = (function() {

  function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
      c_value = null;
    }
    else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
  };

  var preventFormSubmission = function(){
    $(".form-inline").submit(function(event){
      event.preventDefault();
    });
  };

  var preventUserInput = function(){
    $('#date-input').keydown(function(e) {
      e.preventDefault();
      return false;
    });
  };

  var initializePaginationPlugin = function(){
    $('.pagination').jqPagination({
      paged: function(page) {
        var loadPage = domManipulator.getRenderPage();
        loadPage(page);
      },
      max_page: domManipulator.getTransactionInfo().getMaxPages()
    });
  };

  var initializeDatePicker = function(){
    $('#date-input').datetimepicker({
      timepicker:false,
      format:'Y-m-d',
      formatDate:'d/m/Y',
      scrollMonth: false
    });
  };

  return {
    getCookie: getCookie,
    initializePagination: initializePaginationPlugin,
    initializeDatePicker: initializeDatePicker,
    preventFormSubmission: preventFormSubmission,
    preventUserInput: preventUserInput
  };
})();