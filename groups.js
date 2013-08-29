
var groups = {
           "default": "Capas Superpuestas", 
           "background" : {title: "Capas Base", exclusive: true, expanded: true},
           "mapaescolar" : {title: "Mapa Escolar", expanded:false, isOnlyFolder: true, expanded: false,
                            groups: {
                                      "Estatal_Comun_Inicial": {title: "Nivel Inicial", expanded:false},
                                      "Estatal_Comun_Primario": {title: "Nivel Primario", expanded:false},
                                    }
                        }
        }