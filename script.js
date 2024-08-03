// Generate 30 fake data entries
const peopleData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Person ${index + 1}`,
    photo: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
    country: ['USA', 'Canada', 'UK', 'Australia', 'Germany'][Math.floor(Math.random() * 5)],
    city: ['New York', 'Toronto', 'London', 'Sydney', 'Berlin'][Math.floor(Math.random() * 5)],
    age: Math.floor(Math.random() * 40) + 20
}));

let currentPage = 1;
const rowsPerPage = 7;
let filteredData = peopleData;

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

function renderTable() {
    const tableBody = document.querySelector('#peopleTable tbody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach(person => {
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

    updatePaginationInfo();
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById('pageInfo');
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function filterData() {
    const country = document.getElementById('countryFilter').value;
    const city = document.getElementById('cityFilter').value;
    const age = document.getElementById('ageFilter').value;

    filteredData = peopleData.filter(person => 
        (!country || person.country === country) &&
        (!city || person.city === city) &&
        (!age || person.age === parseInt(age))
    );

    currentPage = 1;
    renderTable();
}

function handlePagination(direction) {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    renderTable();
}

// Event listeners
document.getElementById('countryFilter').addEventListener('change', filterData);
document.getElementById('cityFilter').addEventListener('change', filterData);
document.getElementById('ageFilter').addEventListener('input', filterData);
document.getElementById('prevPage').addEventListener('click', () => handlePagination('prev'));
document.getElementById('nextPage').addEventListener('click', () => handlePagination('next'));

// Initialize the table and filters when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateFilters();
    renderTable();
});