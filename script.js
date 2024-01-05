let originalData; // Variable to store the original data

        // Fetch data from the REST API
        // fetch('https://api-pesantren-indonesia.vercel.app/pesantren/3209.json')
        
        fetch('https://booking.kai.id/api/stations2')
            .then(response => response.json())
            .then(data => {
                // Store the original data
                originalData = [data]; // Wrap the single data object in an array for consistency

                // Process the data and populate the table
                const tableBody = document.querySelector('#stationsTable tbody');

                data.forEach((station, index) => {
                    const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${station.code}</td>
                        <td>${station.name}</td>
                        <td>${station.cityname}</td>
                        
                    </tr>`;
                    tableBody.innerHTML += row;
                });
                document.getElementById('dataCount').innerText = `Jumlah Data: ${data.length} data`;
            })
            .catch(error => console.error('Error fetching data:', error));

        // Function to filter pesantren based on search input
        function searchStations() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toUpperCase();
            const table = document.getElementById('stationsTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const tdNo = rows[i].getElementsByTagName('td')[0]; // Index 0 corresponds to the ID column
                const tdName = rows[i].getElementsByTagName('td')[1]; 
                const NamaStasiun = rows[i].getElementsByTagName('td')[2];
                const tdKota = rows[i].getElementsByTagName('td')[3];
                if (tdNo || tdName || NamaStasiun || tdKota) {
                    const txtValueId = tdNo.textContent || tdNo.innerText;
                    const txtValueNama = tdName.textContent || tdName.innerText;
                    const txtValueAlamat = NamaStasiun.textContent || NamaStasiun.innerText;
                    const txtValueKota = tdKota.textContent || tdKota.innerText;
                    if (txtValueId.toUpperCase().indexOf(filter) > -1 || txtValueNama.toUpperCase().indexOf(filter) > -1 || txtValueAlamat.toUpperCase().indexOf(filter) > -1|| txtValueKota.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }

        // Function to reset the table to its original state
        function refreshTable() {
            const table = document.getElementById('stationsTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = ''; // Show all rows
            }

            document.getElementById('searchInput').value = ''; // Clear the search input
        }