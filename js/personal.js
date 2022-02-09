var Personal = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Drivers/Driver?id=');
        self.displayName = 'Favorites page';
        self.favoriteDrivers = ko.observableArray([]);
        self.favoriteConstructors = ko.observableArray([]);
        self.Name =  ko.observableArray('');
        self.Nationality =  ko.observableArray('');
        self.Points =  ko.observableArray('');
        self.Position =  ko.observableArray('');

        self.getDriverInfo = function (arr) {
                console.log("CALL: getFavourites...");
                for (var i = 0; i < arr.length; i++) {
                        console.log(arr[i]);
                        var composedUri = self.baseUri() + arr[i];
                        ajaxHelper(composedUri, "GET").done(function (data) {
                                self.Name(data.Name); 
                                self.Nationality(data.Nationality);
                                self.Points(data.Points);
                                self.Position(data.Position);
                                self.favoriteDrivers.push(data);
                        });
                }
                console.log(self.favoriteDrivers);
        };

        function ajaxHelper(uri, method, data) {
                return $.ajax({
                        type: method,
                        url: uri,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: data ? JSON.stringify(data) : null,
                        error: function (jqXHR, textStatus, errorThrown) {
                                console.log("AJAX Call[" + uri + "] Fail...");
                        }
                });
        }

        self.loadFavoriteDrivers = function () {
                if (localStorage.length < 1) {
                        var el = document.createElement('div');
                        el.className = 'alert alert-info text-light align-center';
                        el.setAttribute("role", "alert");
                        el.style.backgroundColor = '#333';
                        el.style.borderColor = 'grey';
                        var icon = document.createElement('i');
                        icon.className = 'fa fa-exclamation';
                        icon.setAttribute("aria-hidden", "true");
                        el.appendChild(icon);
                        el.innerHTML = 'There are no favorites drivers saved.';
                        document.getElementById("favorites1").appendChild(el);
                        el.style.visibility = 'visible';
                } 
                else 
                {
                        el = document.getElementById("favorites2");
                        el.style.visibility = 'hidden';
                        arr = JSON.parse(localStorage.getItem("DriverIds")); 
                        self.getDriverInfo(arr);
                }
        };

        self.loadFavoriteConstructors = function () {
                if (localStorage.length < 1) {
                        var el = document.createElement('div');
                        el.className = 'alert alert-info text-light align-center';
                        el.setAttribute("role", "alert");
                        el.style.backgroundColor = '#333';
                        el.style.borderColor = 'grey';
                        var icon = document.createElement('i');
                        icon.className = 'fa fa-exclamation';
                        icon.setAttribute("aria-hidden", "true");
                        el.appendChild(icon);
                        el.innerHTML = 'There are no favorites constructors saved.';
                        document.getElementById("favorites2").appendChild(el);
                        el.style.visibility = 'visible';
                } 
                else 
                {
                        el = document.getElementById("favorites2");
                        el.style.visibility = 'hidden';
                        arr = JSON.parse(localStorage.getItem("ConstructorIds")); 
                        self.getDriverInfo(arr);
                }
        };

        //--- start ....
        self.loadFavoriteDrivers();
        // self.loadFavoriteConstructors();
};


$(document).ready(function () {
        console.log("ready!");
        ko.applyBindings(new Personal());
});

