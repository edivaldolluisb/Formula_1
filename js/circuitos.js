// Buscar estatísticas das seasons
var Circuit = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        self.error = ko.observable('');
        self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Circuits/Circuit?id=');
        self.displayName = 'Circuits';
        self.passingMessage = ko.observable('');
        //--- Data Record -> Circuits
        self.CircuitsList = ko.observableArray([]);
        //--- Data Record -> Circuit Details
        self.Name = ko.observable('');
        self.Country = ko.observable('');
        self.CircuitId = ko.observable(1);
        self.ImageUrl = ko.observable('');
        self.Location = ko.observable('');
        self.Lat = ko.observable('');
        self.Lng = ko.observable('');
        self.Alt = ko.observable('');
        self.Url = ko.observable('');
        self.CircuitRef = ko.observable('');

        self.getCircuitos = function () {
                console.log('CALL: getCircuitos...');
                var url = 'http://192.168.160.58/Formula1/api/Circuits';
                $.ajax({
                        type: "GET",
                        url: url,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: '',
                        success: function (data) {
                                self.CircuitsList(data.List);

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                                console.log("AJAX Call[" + url + "] Fail...");
                                self.error(errorThrown);
                        }
                })
        }

        self.getCircuitDetails = function (id) {
                console.log('CALL: getCircuitDetails...');
                var composedUri = self.baseUri() + id;
                ajaxHelper(composedUri, 'GET').done(function (data) {
                        self.Name(data.Name);
                        self.Country(data.Country);
                        self.CircuitId(data.CircuitId);
                        self.ImageUrl(data.ImageUrl);
                        self.Location(data.Location);
                        self.Lat(data.Lat);
                        self.Lng(data.Lng);
                        self.Alt(data.Alt);
                        self.Url(data.Url);
                        self.CircuitRef(data.CircuitRef);
                });
        };

        //--- Internal functions
        function ajaxHelper(uri, method, data) {
                self.error(''); // Clear error message
                return $.ajax({
                        type: method,
                        url: uri,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: data ? JSON.stringify(data) : null,
                        error: function (jqXHR, textStatus, errorThrown) {
                                console.log("AJAX Call[" + uri + "] Fail...");
                                self.error(errorThrown);
                        }
                });

        }

        self.ver_detalhes = function ($data, CircuitId) {
                console.log("cheguei");
                id = CircuitId.CircuitId;
                self.getCircuitDetails(id);
                console.log('coordenadas', self.Lat(), self.Lng());

                let map

                map = new google.maps.Map(document.getElementById("map"), {
                        center: { lat: self.Lat(), lng: self.Lng() },
                        zoom: 15,
                });

                $("#modal_session").show();
        };

        id = 1;
        self.getCircuitos();
        self.getCircuitDetails(id);

};


$('#fechar_detalhes_circuito').click(function () {
        $("#modal_session").hide();
});

