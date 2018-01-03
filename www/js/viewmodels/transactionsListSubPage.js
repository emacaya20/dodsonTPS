function TransactionsListSubPage() {
    var self = this;
    var transactionsListTable;
    var selectedRow;

    self.dateFrom = ko.observable('');
    self.dateTo = ko.observable('');
    self.client = ko.observable('');

    self.load = function () {
        activate_subpage("#transactionsListSubPage");
        self.getData();
    }

    function getMyTeamSQL() {
        var sql = '';
        sql = "SELECT * FROM transactions  order by date desc, id;"
            //        sql = "SELECT * FROM myTeam WHERE myTeam.processingDate = '" + localStorage.processingDate + "' order by status desc, employeeCode;"
        return sql;
    }

    self.getData = function () {
        html5sql.process(
            "SELECT * FROM transactions  order by date desc, id ;",
            function (tx, results) {
                console.log(results.rows);
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
        $('#transactionsListTable tbody').unbind('click');
        transactionsListTable = $('#transactionsListTable').on('init.dt', function () {
            hideLoader();
        }).DataTable({
            destroy: true,
            "pagingType": "full_numbers",
            //            responsive: true,
            "data": data,
            "order": [0, 'desc'],
            columnDefs: [
                {
                    "title": "DATE",
                    "targets": 0,
                    "responsivePriority": 1
                    },
                {
                    "title": "CLIENT",
                    "targets": 1,
                    "responsivePriority": 2
                    },
                {
                    "title": "FL NUMBER",
                    "targets": 2,
                    "responsivePriority": 3
                    },
                {
                    "title": "TYPE",
                    "targets": 3,
                    "responsivePriority": 4
                    }
                    ],
            columns: [
                {
                    "data": 'date',
                    "render": function (date, type, full, meta) {
                        return formatDate(date);
                    }
                    },
                {
                    "data": 'client'
                    },
                {
                    "data": 'flNumber'
                    },
                {
                    "data": 'type'
                    }
                ]

        });

        $('#transactionsListTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected') == false) {
                transactionsListTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            var rowdata = transactionsListTable.row(this).data();
            viewSubPage.load(rowdata);
            selectedRow = this;
        });
    }

    self.home = function () {
        activate_subpage("#homeSubPage");
    }

    self.add = function () {
        addNewSubPage.load();
    }

    self.search = function () {
        var filter = "";

        if (self.client() != "" && self.dateFrom() == "" && self.dateTo() == "") {
            filter = "where client='" + self.client() + "'";
        } else if (self.client() != "" && self.dateFrom() != "" && self.dateTo() == "") {
            filter = "where client='" + self.client() + "' AND date>='" + self.dateFrom() + "' ";

        } else if (self.client() != "" && self.dateFrom() != "" && self.dateTo() != "") {
            filter = "where client='" + self.client() + "' AND date>='" + self.dateFrom() + "' AND date<='" + self.dateTo() + "' ";

        } else if (self.client() == "" && self.dateFrom() != "" && self.dateTo() != "") {
            filter = "where date>='" + self.dateFrom() + "' AND date<='" + self.dateTo() + "' ";

        } else if (self.client() == "" && self.dateFrom() != "" && self.dateTo() == "") {
            filter = "where date>='" + self.dateFrom() + "' ";

        } else if (self.client() == "" && self.dateFrom() == "" && self.dateTo() != "") {
            filter = "where  date<='" + self.dateTo() + "' ";

        }
        html5sql.process(
            "SELECT * FROM transactions " + filter + " order by date desc, id ;",
            function (tx, results) {
                console.log(results.rows);
                self.generateTable(results.rows);
            },
            function (error, statement) {
                console.error("Error: " + error.message + " when processing " + statement);
            }
        );
    }

    self.download = function () {
        html5sql.process(
            "SELECT * FROM transactions  order by date desc, id ;",
            function (tx, results) {
                console.log(results.rows);
                var transactions = results.rows;
                var transactiondetails = [];
                var newtransactiondetails = [];
                html5sql.process(
                    "SELECT * FROM transactiondetails  order by date desc, id ;",
                    function (tx, results) {
                        console.log(results.rows);

                        transactiondetails = results.rows;
                        JSONToCSVConvertor(results.rows, "", true);
                        for (var index = 0; index < transactiondetails.length; index++) {
                            for (var i = 0; i < transactions.length; i++) {
                                if(transactiondetails[index].transactionID == transactions[i].id){
                                    newtransactiondetails.push({
                                       "date":transactiondetails[index].date,
                                        "client":transactions[i].client
                                    });
                                }
                            }
                        }


                        JSONToCSVConvertor(newtransactiondetails, "", true);
                    },
                    function (error, statement) {
                        console.error("Error: " + error.message + " when processing " + statement);
                    }
                );
            },
            function (error, statement) {
                console.error("Error: " + error.message + " when processing " + statement);
            }
        );

    }

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        //    CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "Report_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
