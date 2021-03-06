function ComputeSubPage() {
    var self = this;

    self.scDenom = ko.observable('');
    self.rate = ko.observable('');
    self.days = ko.observable('');
    self.flNumber = ko.observable('');
    self.principal = ko.observable('');
    self.sc = ko.observable('');
    self.interest = ko.observable('');
    self.netProceeds = ko.observable('');

    var interest = 0;
    var sc = 0;
    var serviceCharge = 0;
    var principal = 0;
    var netProceeds = 0;
    var days = 0;
    var headerData = [];
    var headerDetails = [];

    self.load = function (header, details) {
        headerData = [];
        headerDetails = [];

        headerData = header;
        headerDetails = details;

        principal = 0;
        sc = 0;
        serviceCharge = 0;
        interest = 0;
        netProceeds = 0;
        days = 0;

        self.flNumber('');
        self.scDenom('3');
        self.rate('0.05');
        self.principal('');
        self.sc('');
        self.interest('');
        self.netProceeds('');

        activate_subpage("#computeSubPage");
    }

    self.compute = function () {
        principal = 0;
        sc = 0;
        serviceCharge = 0;
        interest = 0;
        netProceeds = 0;
        days = 0;

        for (var index = 0; index < headerDetails.length; index++) {
            principal = principal + headerDetails[index].amount;
        }
        var same = true;
        for (var index = 0; index < headerDetails.length; index++) {
            if (headerDetails[0].days != headerDetails[index].days) {
                same = false;
            }
        }
        console.log(self.rate())
        if (same == true && headerData.type == "Dated") {
            days = headerDetails[0].days;
            interest = Math.round((((principal * self.rate()) * headerDetails[0].days) / 30) + 10);
        } else {

            for (var index = 0; index < headerDetails.length; index++) {
                var rate = Math.round(((headerDetails[index].amount * self.rate()) * headerDetails[index].days) / 30);
                headerDetails[index].interest = rate;
                interest = interest + (((headerDetails[index].amount * self.rate()) * headerDetails[index].days) / 30);
            }
            interest = Math.round(interest + 10);
        }

        if (principal == 1000 || principal <= 10000) {
            sc = 220;
        } else if (principal >= 10001 && principal <= 20000) {
            sc = 270;
        } else if (principal >= 20001 && principal <= 25000) {
            sc = 320;
        } else if (principal >= 25001 && principal <= 50000) {
            sc = 370;
        } else if (principal >= 50001 && principal <= 70000) {
            sc = 420;
        } else if (principal >= 70001 && principal <= 100000) {
            sc = 470;
        } else if (principal >= 100001 && principal <= 150000) {
            sc = 520;
        } else if (principal >= 150001 && principal <= 200000) {
            sc = 620;
        } else if (principal >= 200001 && principal <= 250000) {
            sc = 770;
        } else if (principal >= 250001 && principal <= 300000) {
            sc = 870;
        } else if (principal >= 300001 && principal <= 350000) {
            sc = 970;
        } else if (principal >= 350001 && principal <= 400000) {
            sc = 1020;
        } else if (principal >= 400001 && principal <= 500000) {
            sc = 1220;
        } else if (principal >= 500001 && principal <= 600000) {
            sc = 1520;
        } else if (principal >= 600001 && principal <= 700000) {
            sc = 1820;
        } else if (principal >= 700001 && principal <= 800000) {
            sc = 2020;
        } else if (principal >= 800001 && principal <= 900000) {
            sc = 2520;
        } else if (principal >= 900001 && principal <= 1000000) {
            sc = 2720;
        } else if (principal >= 1000001 && principal <= 1200000) {
            sc = 3020;
        } else if (principal >= 1200001 && principal <= 1400000) {
            sc = 3520;
        } else if (principal >= 1400001 && principal <= 1600000) {
            sc = 4020;
        } else if (principal >= 1800001 && principal <= 1800000) {
            sc = 4520;
        } else if (principal >= 1800001 && principal <= 2000000) {
            sc = 5020;
        } else if (principal >= 2000001 && principal <= 2200000) {
            sc = 5520;
        } else if (principal >= 2200001 && principal <= 2400000) {
            sc = 6020;
        } else if (principal >= 2400001 && principal <= 2600000) {
            sc = 6520;
        } else if (principal >= 2600001 && principal <= 2800000) {
            sc = 7020;
        } else if (principal >= 2800001 && principal <= 3000000) {
            sc = 7520;
        } else if (principal >= 3000001 && principal <= 3200000) {
            sc = 8020;
        } else if (principal >= 3200001 && principal <= 3400000) {
            sc = 8520;
        } else if (principal >= 3400001 && principal <= 3600000) {
            sc = 9020;
        } else if (principal >= 3600001 && principal <= 3800000) {
            sc = 9520;
        } else if (principal >= 3800001 && principal <= 4000000) {
            sc = 10020;
        }

        serviceCharge = Math.round(sc * self.scDenom());

        netProceeds = Math.round(principal - serviceCharge - Math.round(interest));
        self.principal("P " + formatNumber(principal));
        self.sc("P " + formatNumber(serviceCharge));
        self.interest("P " + formatNumber(interest));
        self.netProceeds("P " + formatNumber(netProceeds));

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
                "'" + headerDetails[index].date + "', " +
                "'" + headerDetails[index].days + "', " +
                "'" + headerDetails[index].interest + "'" +

                ");";
            sql.push(transactiondetails);
        }
        return sql;
    }

    function print() {
        printPage.load(headerData, headerDetails, "#computeSubPage");
    }

    self.back = function () {
        activate_subpage("#addNewSubPage");
    }
}
