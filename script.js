const peopleData = [
    {
        id: 1,
        name: "John Doe",
        photo: "https://www.kids-academyuae.com/wp-content/uploads/2020/01/Kids-academy-nursery-learning-gallery-22-800x600.jpg",
        country: "USA",
        city: "New York",
        age: 30
    },
    {
        id: 2,
        name: "Jane Smith",
        photo: "https://www.kids-academyuae.com/wp-content/uploads/2020/01/Kids-academy-nursery-learning-gallery-1-800x600.jpg",
        country: "Canada",
        city: "Toronto",
        age: 25
    }
    // Add more data entries as needed
];

// Initialize the table and filters when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateFilters();
    renderTable(peopleData);
});

function populateFilters() {
    const countries = [...new Set(peopleData.map(person => person.country))];
    const cities = [...new Set(peopleData.map(person => person.city))];

    const countryFilter = document.getElementById('countryFilter');
    const cityFilter = document.getElementById('cityFilter');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

function renderTable(data) {
    const tableBody = document.querySelector('#peopleTable tbody');
    tableBody.innerHTML = '';

    data.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${person.photo}" alt="${person.name}"></td>
            <td>${person.name}</td>
            <td>${person.country}</td>
            <td>${person.city}</td>
            <td>${person.age}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    const country = document.getElementById('countryFilter').value;
    const city = document.getElementById('cityFilter').value;
    const age = document.getElementById('ageFilter').value;

    let filteredData = peopleData;

    if (country) {
        filteredData = filteredData.filter(person => person.country === country);
    }
    if (city) {
        filteredData = filteredData.filter(person => person.city === city);
    }
    if (age) {
        filteredData = filteredData.filter(person => person.age === parseInt(age));
    }

    renderTable(filteredData);
}

// Add event listeners to filters
document.getElementById('countryFilter').addEventListener('change', filterData);
document.getElementById('cityFilter').addEventListener('change', filterData);
document.getElementById('ageFilter').addEventListener('input', filterData);