// Jquery

$(document).ready(function() {
  
  //  Recaptcha for appointment
  $('.appointment-form').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },
    success: function(response) {
      console.log(response);
    }
    });
    //Very important line, it disable the page refresh.
    return false;
  });

  //  Recaptcha for contact
   $('.submitphoto_form').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },
    success: function(response) {
      console.log(response);
    }
    });
    //Very important line, it disable the page refresh.
    return false;
  });
});