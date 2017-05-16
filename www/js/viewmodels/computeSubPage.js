function ComputeSubPage() {
    var self = this;
    var interest = 0;
    var sc = 0;
    var serviceCharge = 0;
    var principal = 0;
    var netProceeds = 0;
    var headerData = [];
    var headerDetails = [];

    self.load = function (header, details) {
        headerData=header;
        headerDetails=details;
        activate_subpage("#computeSubPage");
    }

    self.compute = function () {
        for (var index=0; index<headerDetails.length; index++){
            principal = principal + headerDetails[index].amount;
        }

        if(principal== 1000 && principal<=10000){
            sc = 220;
        }else if(principal>= 10001 && principal<=20000){
            sc = 270;
        }else if(principal>= 20001 && principal<=25000){
            sc = 320;
        }else if(principal>= 25001 && principal<=50000){
            sc = 370;
        }else if(principal>= 50001 && principal<=70000){
            sc = 420;
        }else if(principal>= 70001 && principal<=100000){
            sc = 470;
        }else if(principal>= 100001 && principal<=150000){
            sc = 520;
        }else if(principal>= 150001 && principal<=200000){
            sc = 620;
        }else if(principal>= 200001 && principal<=250000){
            sc = 770;
        }else if(principal>= 250001 && principal<=300000){
            sc = 870;
        }else if(principal>= 300001 && principal<=350000){
            sc = 970;
        }else if(principal>= 350001 && principal<=400000){
            sc = 1020;
        }else if(principal>= 400001 && principal<=500000){
            sc = 1220;
        }else if(principal>= 500001 && principal<=600000){
            sc = 1520;
        }else if(principal>= 600001 && principal<=700000){
            sc = 1820;
        }else if(principal>= 700001 && principal<=800000){
            sc = 2020;
        }else if(principal>= 800001 && principal<=900000){
            sc = 2520;
        }else if(principal>= 900001 && principal<=1000000){
            sc = 2720;
        }else if(principal>= 1000001 && principal<=1200000){
            sc = 3020;
        }else if(principal>= 1200001 && principal<=1400000){
            sc = 3520;
        }else if(principal>= 1400001 && principal<=1600000){
            sc = 4020;
        }else if(principal>= 1800001 && principal<=1800000){
            sc = 4520;
        }else if(principal>= 1800001 && principal<=2000000){
            sc = 5020;
        }else if(principal>= 2000001 && principal<=2200000){
            sc = 5520;
        }else if(principal>= 2200001 && principal<=2400000){
            sc = 6020;
        }else if(principal>= 2400001 && principal<=2600000){
            sc = 6520;
        }else if(principal>= 2600001 && principal<=2800000){
            sc = 7020;
        }else if(principal>= 2800001 && principal<=3000000){
            sc = 7520;
        }else if(principal>= 3000001 && principal<=3200000){
            sc = 8020;
        }else if(principal>= 3200001 && principal<=3400000){
            sc = 8520;
        }else if(principal>= 3400001 && principal<=3600000){
            sc = 9020;
        }else if(principal>= 3600001 && principal<=3800000){
            sc = 9520;
        }else if(principal>= 3800001 && principal<=4000000){
            sc = 10020;
        }

        serviceCharge = sc * self.scDenom().value;
        interest = (((principal * self.rate().value)*self.days())/30)+10;
        netProceeds = principal-serviceCharge-interest;
        self.sc(serviceCharge);
        self.interest(interest);
        self.netProceeds(netProceeds);

    }
}
