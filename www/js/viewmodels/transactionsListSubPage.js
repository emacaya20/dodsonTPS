function TransactionsListSubPage() {
    var self = this;
    var transactionsListTable;
    var selectedRow;

    self.dateFrom = ko.observable('');
    self.dateTo = ko.observable('');
    self.client = ko.observable('');

    self.load = function () {
        self.getData();
        activate_subpage("#transactionsListSubPage");
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
            responsive: true,
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

    self.home=function(){
        activate_subpage("#homeSubPage");
    }
    self.add=function(){
        addNewSubPage.load();
    }
    self.search=function(){

    }
}
