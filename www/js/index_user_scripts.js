/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {


     /* button  #loginEnterButton */
    $(document).on("click", "#loginEnterButton", function(evt)
    {
         /*global activate_subpage */

         activate_subpage("#homeSubPage");
         return false;
    });

        /* button  #newClientButton */
    $(document).on("click", "#newClientButton", function(evt)
    {
         /*global activate_subpage */
        addNewSubPage.load();
         return false;
    });

        /* button  #listButton */
    $(document).on("click", "#listButton", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#listSubPage");
         return false;
    });

    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
