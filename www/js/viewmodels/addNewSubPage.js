function AddNewSubPage() {
    var self = this;

    self.date = ko.observable('');
    self.client = ko.observable('');
    self.clientType = ko.observable('');
    self.transactionType = ko.observable('');
    var details = [];
    var index = 0;

    self.load = function () {
        index = 0;
        details = [];
        activate_subpage("#addNewSubPage");
    }

    self.addCheck = function () {

        details.push({
            "id": index,
            "amount": '',
            "accountName": '',
            "accountNumber": '',
            "bank": '',
            "branch": '',
            "checkNo": '',
            "date": '',
            "days": ''
        });
        index++;
        var theTemplateScript = $("#checkdetails-template").html();

        var theTemplate = Handlebars.compile(theTemplateScript);

        // Pass our data to the template
        var wrapper = {
            "check": details
        };

        //console.log("theCompiledHtml:");
        var theCompiledHtml = theTemplate(wrapper);

        $('.checkdetails').html(theCompiledHtml);


    }

    self.next = function () {

        for (var index = 0; index < details.length; index++) {
            var amount = "amount"+details[index].id;
            details[index].amount = document.getElementById(amount).value;  ;
        }
        console.log(details);
        computeSubPage.load();
    }

}
