// Buscar estatísticas das seasons
var Season = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        self.displayName = 'Season Details';
        self.error = ko.observable('');
        self.passingMessage = ko.observable('');
        //--- Data Record
        self.DriverStandings = ko.observableArray([]); 
        self.ConstructorStandings = ko.observableArray([]);
        self.RacesList = ko.observableArray([]); 
        self.currentYear = ko.observable();
        self.driverName = ko.observable('');
        self.driverRank = ko.observableArray([]);

        self.getDriverStandings = function (year) {
            console.log('CALL: getDrivers...');
            var url = 'http://192.168.160.58/Formula1/api/Statistics/Season?year=' + year;
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: '',
                success: function (data) {
                    self.DriverStandings(data.DriverStandings);
                    /*data.DriverStandings.forEach(element => {
                        var counter = 0; 
                        if(counter < 3){
                            self.driverRank.push(element); 
                            console.log(self.DriverStandings[counter]);
                            counter = counter +1; 
                            console.log(counter); 
                        } 
                    });*/
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + url + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }

        self.getConstructorStandings = function (year) {
            console.log('CALL: getConstructors...');
            var url = 'http://192.168.160.58/Formula1/api/Statistics/Season?year=' + year;
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: '',
                success: function (data) {
                    self.ConstructorStandings(data.ConstructorStandings);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + url + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }

        self.getRaces = function (year) {
            console.log('CALL: getRaces...');
            var url = 'http://192.168.160.58/Formula1/api/Seasons/Season?year=' + year
            $.ajax({
                type: "GET",
                url: url, 
                dataType: 'json',
                contentType: 'application/json',
                data: '',
                success: function (data) {
                    self.RacesList(data.Races);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + url + "] Fail...");
                    self.error(errorThrown);
                }
            });
        };

        self.yearChanged = function (year) 
        {
            self.getDriverStandings(year);
            self.getConstructorStandings(year); 
            self.getRaces(year);
        }

        //--- start ....
        var default_year = '2021';
        self.getDriverStandings(default_year);
        self.getConstructorStandings(default_year); 
        self.getRaces(default_year);
        
    };

   
    $(document).ready(function () {

        const vm = new Season;  

        vm.yearChanged($("#yearPicker:selected").val()); // atualização do valor de year

        /*$("#yearPicker").datepicker({
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years",
            autoclose: true,
        })*/

        $("#yearPicker").selectmenu({
            change: function (event, data) {
                vm.yearChanged(data.item.value)
            }
        })

        console.log("ready!");
        ko.applyBindings(vm);
    });
    