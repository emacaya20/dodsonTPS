function ViewSubPage() {
    var self = this;
    var transactionDetailsListTable;
    var selectedRow;
    self.date = ko.observable('');
    self.client = ko.observable('');
    self.type = ko.observable('');
    self.principal = ko.observable('');
    self.interest = ko.observable('');
    self.serviceCharge = ko.observable('');
    self.netProceeds = ko.observable('');
    self.flNumber = ko.observable('');
    var transactionData = [];
    var transactionDetails = [];
    self.load = function (data) {
        transactionData = data;
        transactionDetails = [];

        self.flNumber(data.flNumber);
        self.date(data.date);
        self.client(data.client);
        self.type(data.type);
        self.principal(formatNumber(data.principal));
        self.interest(formatNumber(data.interest));
        self.serviceCharge(formatNumber(data.serviceCharge));
        self.netProceeds(formatNumber(data.netProceeds));

        self.getData(data.id);
        activate_subpage("#viewSubPage");
    }

    self.back = function () {
        activate_subpage("#transactionsListSubPage");
    }

    self.deleteTransaction = function () {
        notification.confirm("Are you sure do you want to delete this?", function () {
            deleteTransaction();
        }, 'Delete', 'Yes, delete it!');

    }

    function deleteTransaction() {
        html5sql.process(
            "DELETE FROM transactiondetails WHERE transactiondetails.transactionID = '" + transactionData.id + "' ; DELETE FROM transactions WHERE transactions.id = '" + transactionData.id + "' ;",
            function (tx, results) {
                notification.alert("Transaction deleted!", 'success', "Sucess", "OK");
                transactionsListSubPage.load();
            },
            function (error, statement) {
                console.error("Error: " + error.message + " when processing " + statement);
            }
        );
    }

    self.printTransaction = function () {

        printPage.load(transactionData, transactionDetails, "#viewSubPage");

    }
    self.update = function () {
        html5sql.process(
            "UPDATE transactions set flNumber = '" + self.flNumber() + "' WHERE transactions.id = '" + transactionData.id + "';",
            function (tx, results) {
                console.log(results.rows);
                notification.alert("FL Number Updated!", 'success', "Sucess", "OK");
                transactionsListSubPage.load();
            },
            function (error, statement) {
                console.error("Error: " + error.message + " when processing " + statement);
            }
        );
    }

    self.getData = function (id) {
        html5sql.process(
            "SELECT * FROM transactiondetails WHERE transactiondetails.transactionID = '" + id + "' order by id asc;",
            function (tx, results) {
                console.log(results.rows);
                transactionDetails = results.rows;
                self.generateTable(results.rows);
                for (var i = 0; i < results.rows.length; i++) {


                }
            },
            function (error, statement) {
                console.error("Error: " + error.message + " when processing " + statement);
            }
        );
    }

    self.generateTable = function (data) {
        $('#transactionDetailsListTable tbody').unbind('click');
        transactionDetailsListTable = $('#transactionDetailsListTable').on('init.dt', function () {
            hideLoader();
        }).DataTable({
            destroy: true,
            "pagingType": "full_numbers",
            responsive: true,
            "data": data,
            "order": [0, 'desc'],
            columnDefs: [
                {
                    "title": "AMOUNT",
                    "targets": 0,
                    "responsivePriority": 1
                    },
                {
                    "title": "ACCOUNT NAME",
                    "targets": 1,
                    "responsivePriority": 2
                    },
                {
                    "title": "ACCOUNT NO",
                    "targets": 2,
                    "responsivePriority": 3
                    },
                {
                    "title": "BANK",
                    "targets": 3,
                    "responsivePriority": 4
                    },
                {
                    "title": "BRANCH",
                    "targets": 4,
                    "responsivePriority": 5
                    },
                {
                    "title": "CHECK NO",
                    "targets": 5,
                    "responsivePriority": 6
                    },
                {
                    "title": "DATE",
                    "targets": 6,
                    "responsivePriority": 7
                    }
                    ],
            columns: [
                {
                    "data": 'amount',
                    "render": function (amount, type, full, meta) {
                        return formatNumber(amount);
                    }
                    },
                {
                    "data": 'accountName'
                    },
                {
                    "data": 'accountNumber'
                    },
                {
                    "data": 'bank'
                    },
                {
                    "data": 'branch'
                    },
                {
                    "data": 'checkNo'
                    },
                {
                    "data": 'date',
                    "render": function (date, type, full, meta) {
                        return formatDate(date);
                    }
                    }
                ]
        });

        $('#transactionDetailsListTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected') == false) {
                transactionDetailsListTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            var rowdata = transactionDetailsListTable.row(this).data();
            selectedRow = this;
        });
    }
}
