document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map, centered on Cambodia
    const map = L.map('mapid').setView([12.5657, 104.9910], 7); // Center of Cambodia, zoom level 7

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Simulated GeoJSON data for Cambodian provinces with impact scores
    // NOTE: These polygons are illustrative and NOT accurate geographical boundaries.
    // For a real application, you would need to source precise GeoJSON data.
    const provinceGeoJson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "Preah Vihear",
                    "impactScore": 45, // High impact
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
                    "name": "Siem Reap",
                    "impactScore": 10, // Low impact
                    "data": {
                        "militaryBarracksDamage": "None",
                        "civilianPropertyDamage": "Minor",
                        "statePropertyDamage": "None",
                        "civilianDeaths": 1,
                        "militaryDeaths": 0
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [103.8, 13.5], [104.0, 13.6], [104.1, 13.4], [103.9, 13.2],
                        [103.7, 13.3], [103.8, 13.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Banteay Meanchey",
                    "impactScore": 25, // Medium impact
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
                    "name": "Battambang",
                    "impactScore": 18, // Low-medium impact
                    "data": {
                        "militaryBarracksDamage": "Minor",
                        "civilianPropertyDamage": "Minor",
                        "statePropertyDamage": "None",
                        "civilianDeaths": 3,
                        "militaryDeaths": 2
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [102.9, 13.0], [103.2, 13.1], [103.3, 12.9], [103.1, 12.7],
                        [102.8, 12.8], [102.9, 13.0]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Oddar Meanchey",
                    "impactScore": 38, // High impact
                    "data": {
                        "militaryBarracksDamage": "Significant",
                        "civilianPropertyDamage": "High",
                        "statePropertyDamage": "Minor",
                        "civilianDeaths": 12,
                        "militaryDeaths": 15
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [103.5, 14.5], [103.7, 14.6], [103.8, 14.4], [103.6, 14.3],
                        [103.4, 14.4], [103.5, 14.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Koh Kong",
                    "impactScore": 5, // Very low impact
                    "data": {
                        "militaryBarracksDamage": "None",
                        "civilianPropertyDamage": "None",
                        "statePropertyDamage": "None",
                        "civilianDeaths": 0,
                        "militaryDeaths": 0
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [103.0, 11.5], [103.3, 11.6], [103.4, 11.4], [103.1, 11.3],
                        [103.0, 11.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Phnom Penh",
                    "impactScore": 0, // No direct impact
                    "data": {
                        "militaryBarracksDamage": "None",
                        "civilianPropertyDamage": "None",
                        "statePropertyDamage": "None",
                        "civilianDeaths": 0,
                        "militaryDeaths": 0
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [104.8, 11.5], [105.0, 11.6], [105.1, 11.4], [104.9, 11.3],
                        [104.8, 11.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Kampong Cham",
                    "impactScore": 2, // Very low impact
                    "data": {
                        "militaryBarracksDamage": "None",
                        "civilianPropertyDamage": "Very Minor",
                        "statePropertyDamage": "None",
                        "civilianDeaths": 0,
                        "militaryDeaths": 0
                    }
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [105.3, 12.0], [105.6, 12.1], [105.7, 11.9], [105.4, 11.8],
                        [105.3, 12.0]
                    ]]
                }
            }
            // Add more provinces as needed with illustrative coordinates and impact data
        ]
    };

    const provinceDataPanel = document.getElementById('province-data');
    const dataContent = provinceDataPanel.querySelector('.data-content');

    let geojsonLayer; // To store the GeoJSON layer
    let lastClickedLayer = null; // To keep track of the last clicked province

    // Function to get color based on impact score (for heatmap)
    function getColor(d) {
        return d > 40 ? '#800026' : // High impact
               d > 30 ? '#BD0026' :
               d > 20 ? '#E31A1C' :
               d > 10 ? '#FC4E2A' :
               d > 5  ? '#FD8D3C' :
               d > 0  ? '#FEB24C' : // Low impact
                        '#FFEDA0'; // No impact
    }

    // Function to style GeoJSON features
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.impactScore),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    // Function to update the data panel
    function updateDataPanel(properties) {
        if (!properties || !properties.data) {
            dataContent.innerHTML = `
                <h2>Select a Province</h2>
                <p>Click on a highlighted province on the map to view detailed conflict impact data.</p>
                <p>Provinces are colored based on conflict impact intensity (darker red = higher impact).</p>
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

    // Function for hover (mouseover) effect
    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.9
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        // Temporarily show data on hover if no province is currently clicked
        if (!lastClickedLayer) {
            updateDataPanel(layer.feature.properties);
        }
    }

    // Function to reset style on mouseout
    function resetHighlight(e) {
        const layer = e.target;
        // Only reset if it's not the currently clicked layer
        if (layer !== lastClickedLayer) {
            geojsonLayer.resetStyle(layer);
        }
        // If no layer is clicked, reset data panel to default message
        if (!lastClickedLayer) {
            updateDataPanel(null);
        }
    }

    // Function to handle feature clicks
    function clickFeature(e) {
        const layer = e.target;

        // Reset style of previously selected layer (if any)
        if (lastClickedLayer && lastClickedLayer !== layer) {
            geojsonLayer.resetStyle(lastClickedLayer);
        }

        // Highlight the clicked layer
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.9
        });

        // Store the current layer as the last clicked
        lastClickedLayer = layer;

        // Update the data panel with the clicked province's data
        updateDataPanel(layer.feature.properties);
    }

    // Function to attach event listeners to each feature
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: clickFeature
        });
    }

    // Add GeoJSON data to the map
    geojsonLayer = L.geoJson(provinceGeoJson, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    // Set initial data panel content
    updateDataPanel(null); // Call with null to show initial prompt

    // Add a legend to the map
    const legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 5, 10, 20, 30, 40]; // Impact score ranges
        const labels = ['<strong>Impact Score</strong>'];

        // Loop through our density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<div><i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+') + '</div>';
        }

        return div;
    };

    legend.addTo(map);
});

