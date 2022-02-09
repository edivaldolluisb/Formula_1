var data = {
        "upcomingraces": [
                {
                        "round": 1,
                        "name": "FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2022",
                        "begday": 18,
                        "finishday": 20,  
                        "month": "March",
                        "country": "Bahrain",
                        "circuiturl": "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Bahrain%20carbon.png.transform/3col/image.png",
                        "price": 167.51
                },
                {
                        "round": 2,
                        "name": "FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2022",
                        "begday": 25,
                        "finishday": 27,  
                        "month": "March",
                        "country": "Saudi Arabia",
                        "circuiturl": "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon.png.transform/3col/image.png",
                        "price": 167.51
                },
                {
                        "round": 3,
                        "name": "FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022",
                        "begday": 8,
                        "finishday": 10,  
                        "month": "April",
                        "country": "Australia",
                        "circuiturl": "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon.png.transform/3col/image.png",
                        "price": 167.51
                },
                {
                        "round": 4,
                        "name": "FORMULA 1 ROLEX GRAN PREMIO DELL'EMILIA ROMAGNA 2022",
                        "begday": 22,
                        "finishday": 24,  
                        "month": "March",
                        "country": "Italy",
                        "circuiturl": "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Emilia%20Romagna%20carbon.png.transform/3col/image.png",
                        "price": 167.51
                }
        ]
}


var viewModel = ko.mapping.fromJS(data);
console.log(viewModel);