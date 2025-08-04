document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('mapid').setView([14.5, 103.5], 8); // Centered near the border, zoom level 8

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Placeholder for province data (Simplified GeoJSON for demonstration)
    // In a real application, you would load this from a .geojson file or an API
    const provinceGeoJson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "Preah Vihear (Cambodia)",
                    "country": "Cambodia",
                    "data": {
                        "militaryBarracksDamage": "Extensive",
                        "civilianPropertyDamage": "High",
                        "statePropertyDamage": "Moderate (including temple area)",
                        "civilianDeaths": 15,
                        "militaryDeaths": 25
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [104.7, 14.7], [104.8, 14.6], [104.9, 14.5], [104.8, 14.4],
                        [104.7, 14.3], [104.6, 14.4], [104.5, 14.5], [104.6, 14.6],
                        [104.7, 14.7]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Surin (Thailand)",
                    "country": "Thailand",
                    "data": {
                        "militaryBarracksDamage": "Moderate",
                        "civilianPropertyDamage": "High",
                        "statePropertyDamage": "Minor",
                        "civilianDeaths": 10,
                        "militaryDeaths": 18
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [103.2, 14.8], [103.3, 14.7], [103.4, 14.6], [103.3, 14.5],
                        [103.2, 14.4], [103.1, 14.5], [103.0, 14.6], [103.1, 14.7],
                        [103.2, 14.8]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Banteay Meanchey (Cambodia)",
                    "country": "Cambodia",
                    "data": {
                        "militaryBarracksDamage": "Minor",
                        "civilianPropertyDamage": "Moderate",
                        "statePropertyDamage": "None",
                        "civilianDeaths": 5,
                        "militaryDeaths": 7
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [102.8, 13.8], [102.9, 13.7], [103.0, 13.6], [102.9, 13.5],
                        [102.8, 13.4], [102.7, 13.5], [102.6, 13.6], [102.7, 13.7],
                        [102.8, 13.8]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Sisaket (Thailand)",
                    "country": "Thailand",
                    "data": {
                        "militaryBarracksDamage": "Significant",
                        "civilianPropertyDamage": "Moderate",
                        "statePropertyDamage": "Minor",
                        "civilianDeaths": 8,
                        "militaryDeaths": 12
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [104.2, 14.9], [104.3, 14.8], [104.4, 14.7], [104.3, 14.6],
                        [104.2, 14.5], [104.1, 14.6], [104.0, 14.7], [104.1, 14.8],
                        [104.2, 14.9]
                    ]]
                }
            }
        ]
    };

    const provinceDataPanel = document.getElementById('province-data');
    const dataContent = provinceDataPanel.querySelector('.data-content');

    // Function to style GeoJSON features
    function style(feature) {
        return {
            fillColor: feature.properties.country === 'Cambodia' ? '#FFC107' : '#2196F3', // Yellow for Cambodia, Blue for Thailand
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        };
    }

    // Function to update the data panel
    function updateDataPanel(properties) {
        if (!properties || !properties.data) {
            dataContent.innerHTML = `
                <h2>Select a Province</h2>
                <p>Click on a highlighted province on the map to view detailed conflict impact data.</p>
            `;
            return;
        }

        const data = properties.data;
        dataContent.innerHTML = `
            <h3>${properties.name}</h3>
            <p><strong>Damage to Military Barracks:</strong> ${data.militaryBarracksDamage}</p>
            <p><strong>Damage to Civilian Property:</strong> ${data.civilianPropertyDamage}</p>
            <p><strong>Damage to State Property:</strong> ${data.statePropertyDamage}</p>
            <p><strong>Civilian Deaths:</strong> ${data.civilianDeaths}</p>
            <p><strong>Military Deaths:</strong> ${data.militaryDeaths}</p>
        `;
    }

    // Function to handle feature clicks
    function onEachFeature(feature, layer) {
        layer.on({
            click: function(e) {
                // Reset style of previously selected layer (if any)
                if (window.lastClickedLayer) {
                    geojsonLayer.resetStyle(window.lastClickedLayer);
                }

                // Highlight the clicked layer
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.8
                });

                // Store the current layer as the last clicked
                window.lastClickedLayer = layer;

                // Update the data panel with the clicked province's data
                updateDataPanel(feature.properties);
            }
        });
    }

    // Add GeoJSON data to the map
    const geojsonLayer = L.geoJson(provinceGeoJson, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    // Set initial data panel content
    updateDataPanel(null); // Call with null to show initial prompt
});

