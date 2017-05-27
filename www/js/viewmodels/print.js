function PrintPage(){
    var self = this;
    var transactionData = [];
    var transactionDetails = [];
    self.date = ko.observable('');
    self.client = ko.observable('');
    self.type = ko.observable('');
    self.principal = ko.observable('');
    self.interest = ko.observable('');
    self.serviceCharge = ko.observable('');
    self.netProceeds = ko.observable('');
    self.flNumber = ko.observable('');

    self.load = function(headerData, headerDetails){
        transactionData = headerData;
        transactionDetails = headerDetails;
        console.log(headerData)
        console.log(headerDetails)
        activate_subpage("#print1");
        self.date(transactionData.date);
        self.client(transactionData.client);
        self.type(transactionData.type);
        self.flNumber(transactionData.flNumber);
    }


}
