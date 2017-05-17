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
        self.date(formatDate(new Date()));

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
            var amount = "amount" + details[index].id;
            var accountName = "accountName" + details[index].id;
            var accountNumber = "accountNumber" + details[index].id;
            var bank = "bank" + details[index].id;
            var branch = "branch" + details[index].id;
            var checkNo = "checkNo" + details[index].id;
            var date = "date" + details[index].id;
            var days = "days" + details[index].id;
            details[index].amount = Number(document.getElementById(amount).value);
            details[index].accountName = document.getElementById(accountName).value;;
            details[index].accountNumber = document.getElementById(accountNumber).value;;
            details[index].bank = document.getElementById(bank).value;;
            details[index].branch = document.getElementById(branch).value;;
            details[index].checkNo = document.getElementById(checkNo).value;;
            details[index].date = document.getElementById(date).value;;
            details[index].days = document.getElementById(days).value;;
        }
        console.log(details);
        var header = {
            "date":self.date(),
            "client":self.client(),
            "type":self.clientType(),
            "flNumber":''
        }
        computeSubPage.load(header, details);
    }

    self.back = function () {
        activate_subpage("#homeSubPage");
    }

}
