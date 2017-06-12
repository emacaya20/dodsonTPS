function SpecialClientSubPage() {
    var self = this;

    self.serviceCharge = ko.observable('');
    self.interest = ko.observable('');
    self.days = ko.observable('');
    self.flNumber = ko.observable('');
    self.principal = ko.observable('');
    self.sc = ko.observable('');
    self.interest = ko.observable('');
    self.netProceeds = ko.observable('');

    var interest = 0;
    var serviceCharge = 0;
    var principal = 0;
    var netProceeds = 0;
    var days = 0;
    var headerData = [];
    var headerDetails = [];

    self.load = function (header, details) {
        headerData = header;
        headerDetails = details;
        activate_subpage("#specialClientSubPage");
        principal = 0;
        for (var index = 0; index < headerDetails.length; index++) {
            principal = principal + headerDetails[index].amount;
        }
        self.principal('');
        self.principal(principal);
        self.serviceCharge('');
        self.interest('');
        self.netProceeds('');
    }

    self.compute = function () {

        serviceCharge = 0;
        interest = 0;
        netProceeds = 0;

        serviceCharge = Number(self.serviceCharge());
        interest = Number(self.interest());
        days = self.days();

        netProceeds = Math.round(principal - serviceCharge - interest);


        self.netProceeds(netProceeds);

    }

    self.save = function () {
        if (self.flNumber() == "") {
            notification.alert("Enter FL Number!", 'error', "Error", "OK");
        } else {
            html5sql.process(
                insertTransactionHeader(),
                function (tx, results) {
                    console.log(results);
                    html5sql.process(
                        insertTransactionHeaderDetails(results.insertId),
                        function (tx, results) {
                            notification.alert("Transaction saved!", 'success', "Sucess", "OK");
                            print();
                            hideLoader();
                        },
                        function (error, statement) {
                            console.error("Error: " + error.message + " when processing " + statement);
                        });
                },
                function (error, statement) {
                    console.error("Error: " + error.message + " when processing " + statement);
                });
        }
    }

    function insertTransactionHeader() {
        headerData.principal = principal;
        headerData.interest = interest;
        headerData.serviceCharge = serviceCharge;
        headerData.netProceeds = netProceeds;
        headerData.days = days;
        headerData.flNumber = self.flNumber();
        var sql = new Array();
        transactions = "INSERT INTO transactions (date, client, clientType, type, principal, interest, serviceCharge, netProceeds, days, flNumber) VALUES (" +
            "'" + formatDate(headerData.date) + "'," +
            "'" + headerData.client + "'," +
            "'" + headerData.clientType + "'," +
            "'" + headerData.type + "'," +
            "'" + principal + "'," +
            "'" + interest + "'," +
            "'" + serviceCharge + "'," +
            "'" + netProceeds + "'," +
            "'" + days + "'," +
            "'" + headerData.flNumber + "'" +
            ");";
        sql.push(transactions);

        return sql;
    }

    function insertTransactionHeaderDetails(id) {
        var sql = new Array();
        for (var index = 0; index < headerDetails.length; index++) {


            transactiondetails = "INSERT INTO transactiondetails (transactionID, amount, accountName, accountNumber, bank, branch, checkNo, date, days, interest) VALUES (" +
                "'" + id + "'," +
                "'" + headerDetails[index].amount + "'," +
                "'" + headerDetails[index].accountName + "'," +
                "'" + headerDetails[index].accountNumber + "'," +
                "'" + headerDetails[index].bank + "'," +
                "'" + headerDetails[index].branch + "', " +
                "'" + headerDetails[index].checkNo + "', " +
                "'" + formatDate(headerDetails[index].date) + "', " +
                "'" + headerDetails[index].days + "', " +
                "'" + headerDetails[index].interest + "'" +

                ");";
            sql.push(transactiondetails);
        }
        return sql;
    }

    function print() {
        printPage.load(headerData, headerDetails, "#specialClientSubPage");
    }

    self.back = function () {
        activate_subpage("#addNewSubPage");
    }
}
