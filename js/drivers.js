// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/drivers');
    //self.baseUri = ko.observable('http://localhost:62595/api/drivers');
    self.displayName = 'Drivers List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.addFavourite = ko.observable(null);
    self.favourites = ko.observableArray([]);
    self.favouritesName = ko.observableArray([]);
    self.favouritesNationality = ko.observableArray([]);
    self.favouritesImage = ko.observableArray([]);
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
    self.addFavourite = function (DriverId) {
        // console.log(this);
        if (storageAvailable('localStorage')) {
            if (self.favourites.indexOf(DriverId) == -1) {
                self.favourites.push(DriverId);
            }
            else {
                console.log($("#DriverId").classList);
                $("#DriverId").find($(".fa")).removeClass('fa-heart').addClass('fa-heart-o');
                self.favourites.remove(DriverId);
                alert('Favourite driver has been removed.');
            }
            $("#DriverId").find($(".fa")).removeClass('fa-heart-o').addClass('fa-heart');
            localStorage.setItem("DriverIds", JSON.stringify(self.favourites()));
            alert('Favourite driver has been added.'); 
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

// Auto complete search bar implementation
$(document).ready(function () {
    var selectedItemUrl = "";
    $("#SearchText").autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                url: 'http://192.168.160.58/Formula1/api/Search/Drivers?q=' + $('#SearchText').val(),
                dataType: 'json',
                data: '',
                success: function (data) {
                        var nData = $.map(data, function (value, key) {
                            return {
                                label: value.Name,
                                value: value.DriverId
                            }
                        });
                        results = $.ui.autocomplete.filter(nData, request.term);
                        response(results);
                },
                error: function () {
                    alert("error!");
                }
            });
        },
        select: function (event, ui) {
            //console.log('cheguei');
            event.preventDefault();
            $("#SearchText").val(ui.item.label); // nome
            var DriverId = ui.item.value; // DriverId
            var new_url = "https://www.google.com/"; // nova href
            console.log(new_url);
            document.getElementById("chosen").setAttribute("href",  + new_url); 
            alert( document.getElementById("chosen").getAttribute("href"));
        },
        close: function(event, ui) {
            console.log("close");
            doFilter($("#SearchText").val().toLowerCase());
        }
    });
});

function doFilter(value) {
    console.log("doFilter: " + value);
    $("#table-drivers tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function changeLink() {
    console.log("clicou");
    //alert(document.getElementById("chosen").getAttribute("href")); 
}