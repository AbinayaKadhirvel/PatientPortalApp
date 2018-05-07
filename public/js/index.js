jQuery(document).ready(function(){

    jQuery('#loginsubmit').click( function() {
        jQuery('#login-form').attr('action', '/auth/signin');
        jQuery('#login-form').submit();
    });
    jQuery('#signupsubmit').click( function() {

        jQuery('#login-form').attr('action', '/auth/signup');
         jQuery('#login-form').submit();
    });
});
