// Generate 30 fake data entries
const peopleData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Person ${index + 1}`,
    photo: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
    country: ['USA', 'Canada', 'UK', 'Australia', 'Germany'][Math.floor(Math.random() * 5)],
    city: ['New York', 'Toronto', 'London', 'Sydney', 'Berlin'][Math.floor(Math.random() * 5)],
    age: Math.floor(Math.random() * 40) + 20
}));