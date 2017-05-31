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
        self.addCheck();
        self.client('');

    }

    self.addCheck = function () {
        for (var i = 0; i < details.length; i++) {
            var amount = "amount" + details[i].id;
            var accountName = "accountName" + details[i].id;
            var accountNumber = "accountNumber" + details[i].id;
            var bank = "bank" + details[i].id;
            var branch = "branch" + details[i].id;
            var checkNo = "checkNo" + details[i].id;
            var date = "date" + details[i].id;
            var days = "days" + details[i].id;
            details[i].amount = Number(document.getElementById(amount).value);
            details[i].accountName = document.getElementById(accountName).value;
            details[i].accountNumber = document.getElementById(accountNumber).value;
            details[i].bank = document.getElementById(bank).value;
            details[i].branch = document.getElementById(branch).value;
            details[i].checkNo = document.getElementById(checkNo).value;
            details[i].date = document.getElementById(date).value;
            details[i].days = document.getElementById(days).value;
        }
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
//console.log(theTemplateScript)
        var theTemplate = Handlebars.compile(theTemplateScript);

        // Pass our data to the template
        var wrapper = {
            "check": details
        };

        //console.log("theCompiledHtml:");
        var theCompiledHtml = theTemplate(wrapper);
console.log(theCompiledHtml)
        $('.checkdetails').html(theCompiledHtml);



    }

    self.next = function () {

        for (var i = 0; i < details.length; i++) {
            var amount = "amount" + details[i].id;
            var accountName = "accountName" + details[i].id;
            var accountNumber = "accountNumber" + details[i].id;
            var bank = "bank" + details[i].id;
            var branch = "branch" + details[i].id;
            var checkNo = "checkNo" + details[i].id;
            var date = "date" + details[i].id;
            var days = "days" + details[i].id;
            details[i].amount = Number(document.getElementById(amount).value);
            details[i].accountName = document.getElementById(accountName).value;;
            details[i].accountNumber = document.getElementById(accountNumber).value;;
            details[i].bank = document.getElementById(bank).value;;
            details[i].branch = document.getElementById(branch).value;;
            details[i].checkNo = document.getElementById(checkNo).value;;
            details[i].date = document.getElementById(date).value;;
            details[i].days = document.getElementById(days).value;;
        }
        console.log(details);
        var header = {
            "date":self.date(),
            "client":self.client(),
            "type":self.clientType(),
            "flNumber":'',
            "principal":'',
            "interest":'',
            "serviceCharge":'',
            "netProceeds":''
        }
        computeSubPage.load(header, details);
    }

    self.back = function () {
        activate_subpage("#homeSubPage");
    }

}
