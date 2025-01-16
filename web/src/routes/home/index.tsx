import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const mockCars = [
    { id: 1, name: 'Toyota Corolla', price: '$20,000', image: '/images/corolla.jpg' },
    { id: 2, name: 'Honda Civic', price: '$25,000', image: '/images/civic.jpg' },
    { id: 3, name: 'Suzuki Alto', price: '$15,000', image: '/images/alto.jpg' },
  ];

  return (
    <div>
      <h1>Welcome to DreamCarPK</h1>
      <div class="car-list">
        {mockCars.map((car) => (
          <div class="car-item" key={car.id}>
            <img src={car.image} alt={car.name} />
            <h2>{car.name}</h2>
            <p>{car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
