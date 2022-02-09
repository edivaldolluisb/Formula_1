// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/constructors');
    //self.baseUri = ko.observable('http://localhost:62595/api/constructors');
    self.displayName = 'Constructors List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.addFavourite = ko.observable(null);
    self.favouritesC = ko.observableArray([]);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDrivers...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.List);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.PageCount);
            self.totalRecords(data.Total);
            // self.SetFavourites(); 
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
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    // Guardar os favoritos na local storage 
    self.addFavouriteC = function (CircuitId) {
        // console.log(this);
        if (storageAvailable('localStorage')) {
            if (self.favouritesC.indexOf(CircuitId) == -1) {
                self.favouritesC.push(CircuitId);
            }
            else {
                self.favouritesC.remove(DriverId);
                alert('Favourite constructor has been removed.');
            }
            localStorage.setItem("ConstructorIds", JSON.stringify(self.favouritesC()));
            alert('Favourite constructor has been added.'); 
        }
        else {
            alert('Limit of favourite drivers exceeded.');
        }
    };

    // Verificar se há local na local storage para guardar os favoritos
    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    // Guardar os constructors favoritos na local storage 
    self.addFavourite = function (CircuitoId) {
        if (storageAvailable('localStorage')) {
            if (self.favourites.indexOf(DriverId) == -1) {
                self.favourites.push(DriverId);
            }
            else {
                self.favourites.remove(DriverId);
                alert('Favourite driver has been removed.');
            }
            localStorage.setItem("DriverIds", JSON.stringify(self.favourites()));
            alert('Favourite driver has been added.');
        }
        else {
            alert('Limit of favourite drivers exceeded.');
        }
    };

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});


/* pegar o id do botão*/


function pegar_id_botao(id_txt) {
    var id = parseInt(id_txt)
    console.log('constructor id: ' + id, id)

    let myIframe = document.getElementById("ver_dados_constructors");
    let url_string = "http://127.0.0.1:5501//constructors/ver_constructor.html?id=";


    let adsURL = url_string + id
    console.log(adsURL);
    myIframe.src = adsURL;
}

// Auto complete search bar implementation
$(document).ready(function () {
    var selectedItemUrl = "";
    $("#SearchText").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                url: 'http://192.168.160.58/Formula1/api/Search/Constructors?q=' + $('#SearchText').val(),
                dataType: 'json',
                data: '',
                success: function (data) {
                response($.map(data, function (item) {
                    return item.Name;
                }));
                },
            });
        }
    });
});