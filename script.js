function initMap() {
    let mapa = new google.maps.Map(document.getElementById("mapa"), {
        center: { lat: 6.2442, lng: -75.5812 }, // Medellín por defecto
        zoom: 12
    });

    window.mapa = mapa; // Guarda el mapa globalmente para futuras actualizaciones
}

function actualizarMapa() {
    let ubicaciones = {
        1: { lat: 6.2085, lng: -75.5670 }, // Poblado
        2: { lat: 6.1759, lng: -75.5917 }, // Envigado
        3: { lat: 6.1516, lng: -75.6152 }, // Sabaneta
        4: { lat: 6.1578, lng: -75.6353 }, // La Estrella
        5: { lat: 6.1691, lng: -75.6114 }, // Itagüí
        6: { lat: 6.3373, lng: -75.5610 }, // Bello
        7: { lat: 6.3467, lng: -75.4357 }, // Copacabana
        8: { lat: 6.4378, lng: -75.3341 }, // Barbosa
        9: { lat: 6.3753, lng: -75.4444 }, // Girardota
        10: { lat: 6.0329, lng: -75.6344 }, // Caldas
        11: { lat: 6.2442, lng: -75.5812 }  // Medellín
    };

    let restaurantes = {
        1: [
            { nombre: "Restaurante P1", lat: 6.2090, lng: -75.5640 },
            { nombre: "Restaurante P2", lat: 6.2102, lng: -75.5701 }
        ],
        2: [
            { nombre: "Restaurante E1", lat: 6.1765, lng: -75.5905 },
            { nombre: "Restaurante E2", lat: 6.1790, lng: -75.5920 }
        ],
        3: [
            { nombre: "Restaurante S1", lat: 6.1500, lng: -75.6140 },
            { nombre: "Restaurante S2", lat: 6.1522, lng: -75.6170 }
        ]
    };

    let seleccion = document.getElementById("buscar_zona").value;
    let coordenadas = ubicaciones[seleccion];

    if (coordenadas) {
        window.mapa.setCenter(coordenadas);

        new google.maps.Marker({
            position: coordenadas,
            map: window.mapa,
            title: "Zona seleccionada",
            icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        // Agregar marcadores de restaurantes en la zona seleccionada
        if (restaurantes[seleccion]) {
            restaurantes[seleccion].forEach(restaurante => {
                let marcador = new google.maps.Marker({
                    position: { lat: restaurante.lat, lng: restaurante.lng },
                    map: window.mapa,
                    title: restaurante.nombre,
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });

                let infoWindow = new google.maps.InfoWindow({
                    content: `<strong>${restaurante.nombre}</strong><br>Ubicación: (${restaurante.lat}, ${restaurante.lng})`
                });

                marcador.addListener("click", () => {
                    infoWindow.open(window.mapa, marcador);
                });
            });
        }
    }
}