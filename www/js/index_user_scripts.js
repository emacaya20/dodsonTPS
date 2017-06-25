/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers
    */
    function register_event_handlers() {


        /* button  #loginEnterButton */
        $(document).on("click", "#loginEnterButton", function (evt) {
            /*global activate_subpage */

            //         activate_page("#print");
            if (document.getElementById('password').value == "dodson") {

                activate_subpage("#homeSubPage");
            } else {
                notification.alert("Password is incorrect!", 'error', "Error", "OK");
            }
            return false;
        });

        /* button  #newClientButton */
        $(document).on("click", "#newClientButton", function (evt) {
            /*global activate_subpage */
            addNewSubPage.load();
            return false;
        });

        /* button  #listButton */
        $(document).on("click", "#listButton", function (evt) {
            /*global activate_subpage */
            transactionsListSubPage.load();
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();
