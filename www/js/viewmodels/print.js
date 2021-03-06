function PrintPage() {
    var self = this;
    var transactionData = [];
    var transactionDetails = [];
    var currentPage = "";
    var previousPage = "";
    var index = 0;

    self.date = ko.observable('');
    self.client = ko.observable('');
    self.type = ko.observable('');
    self.principal = ko.observable('');
    self.interest = ko.observable('');
    self.serviceCharge = ko.observable('');
    self.netProceeds = ko.observable('');
    self.days = ko.observable('');
    self.flNumber = ko.observable('');

    self.load = function (headerData, headerDetails, prevpage) {
        previousPage = prevpage;
        currentPage = "print1";
        index = 0;
        transactionData = headerData;
        transactionDetails = headerDetails;
        console.log(headerData)
        console.log(headerDetails)
        activate_subpage("#print1");
        clearFields();

        self.date(formatDate(transactionData.date));
        self.client(transactionData.client);
        self.principal("P " + formatNumber(transactionData.principal));
        self.interest("P " + formatNumber(transactionData.interest));
        self.serviceCharge("P " + formatNumber(transactionData.serviceCharge));
        self.netProceeds("P " + formatNumber(transactionData.netProceeds));
        if (transactionData.days > 0) {
            self.days(transactionData.days + " days");
        }
        self.flNumber(transactionData.flNumber);
        self.print1();
    }

    function clearFields() {
        self.date('');
        self.client('');
        self.principal('');
        self.interest('');
        self.serviceCharge('');
        self.netProceeds('');
        self.days('');
        self.flNumber('');
    }


    self.print = function () {
        $('#printFooter').addClass('hidden');
        window.print();
        setTimeout(function () {

            $('#printFooter').removeClass('hidden');
        }, 1000)

    }

    self.back = function () {

        if (currentPage == "print1") {

            //            currentPage = "computeSubPage";
            activate_subpage(previousPage);
        } else {
            index = 0;
            self.print1();
            currentPage = "print1";
            activate_subpage("#print1");
        }
        //        else if (currentPage == "print2") {
        //            currentPage = "print1";
        //            activate_subpage("#print1");
        //        } else if (currentPage == "receipt") {
        //            currentPage = "print2";
        //            activate_subpage("#print2");
        //        }
    }

    self.next = function () {
        if (currentPage == "print1") {
            if (index + 1 < transactionDetails.length) {
                currentPage = "print2";
                activate_subpage("#print2");
                self.print2();
            } else {
                currentPage = "receipt";
                activate_subpage("#receipt");
            }
        } else if (currentPage == "print2") {
            if (index + 1 < transactionDetails.length) {
                self.print2();
            } else {
                currentPage = "receipt";
                activate_subpage("#receipt");
            }
        } else {
            currentPage = "homeSubPage";
            activate_subpage("#homeSubPage");
        }
    }

    self.print1 = function () {
        var details = [];
        var length = transactionDetails.length;
        if (transactionDetails.length > 3) {
            length = 3;
        }
        for (var i = 0; i < length; i++) {
            index = i;
            details.push(transactionDetails[i]);
        }
        for (var i = 0; i < details.length; i++) {
            if (isNaN(details[i].amount) == false) {

                var newAmount = formatNumber(Number(details[i].amount));
            } else {
                var newAmount = details[i].amount;
            }

            var newDate = formatDate(details[i].date);
            details[i].date = newDate;
            details[i].amount = newAmount;
        }
        if (transactionData.type == "Dated") {
            var theTemplateScript = $("#printDetails-template").html();
        } else {
            var theTemplateScript = $("#postdated-printDetails-template").html();
        }

        var theTemplate = Handlebars.compile(theTemplateScript);

        // Pass our data to the template
        var wrapper = {
            "printDetails": details
        };

        var theCompiledHtml = theTemplate(wrapper);
        $('.printDetails').html(theCompiledHtml);



    }
    self.print2 = function () {
        var details = [];
        var length = transactionDetails.length;
        if (transactionDetails.length > index + 6) {
            length = index + 6;
        }
        for (var i = index + 1; i < length; i++) {
            index = i;
            details.push(transactionDetails[i]);
        }

        for (var i = 0; i < details.length; i++) {
            var newAmount = formatNumber(details[i].amount);
            var newDate = formatDate(details[i].date);
            details[i].date = newDate;
            details[i].amount = newAmount;
        }

        if (transactionData.type == "Dated") {
            var theTemplateScript = $("#printDetails-template").html();
        } else {
            var theTemplateScript = $("#postdated-printDetails-template").html();
        }
        var theTemplate = Handlebars.compile(theTemplateScript);

        // Pass our data to the template
        var wrapper = {
            "printDetails": details
        };

        var theCompiledHtml = theTemplate(wrapper);
        $('.printDetails2').html(theCompiledHtml);

    }
    self.print3 = function () {
        var details = [];
        var length = transactionDetails.length;
        if (transactionDetails.length > 11) {
            length = 11;
        }
        for (var i = 7; i < length; i++) {
            details.push(transactionDetails[i]);
        }
        var theTemplateScript = $("#printDetails2-template").html();

        var theTemplate = Handlebars.compile(theTemplateScript);

        // Pass our data to the template
        var wrapper = {
            "printDetails": details
        };

        var theCompiledHtml = theTemplate(wrapper);
        console.log(theCompiledHtml)
        $('.printDetails2').html(theCompiledHtml);

    }

}
