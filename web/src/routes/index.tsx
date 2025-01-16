import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

// Import images for mock data
import HondaCivicImage from "~/media/honda_civic.jpg?jsx";
import FordMustangImage from "~/media/ford_mustang.jpg?jsx";
import DefaultCarImage from "~/media/vecteezy_car-icon-vector-illustration_.jpg?jsx";

export default component$(() => {
  const cars = [
    { id: 1, maker: "Honda", model: "Civic", isAvailable: true, photo: HondaCivicImage },
    { id: 2, maker: "Ford", model: "Mustang", isAvailable: true, photo: FordMustangImage },
    { id: 3, maker: "Toyota", model: "Corolla", isAvailable: false, photo: DefaultCarImage }, // Default image
  ];

  return (
    <div class="cars-wrapper p-4">
      <h1 class="text-2xl font-bold mb-6">Available Cars</h1>
      <form action="/car_page" method="post" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <button
            key={car.id}
            type="submit"
            name="carId"
            value={car.id}
            class="car-wrapper-submit"
          >
            <div class="car-gallery-container">
              <div class="car-gallery hover:outline hover:outline-black">
                <div class="img-container">
                  <car.photo class="rounded-t-lg shadow-inset w-full max-h-[250px] object-contain transition-transform duration-500 ease-in-out hover:scale-110" />
                </div>
                <div class="car-description relative -top-5 text-center">
                  <strong class="car-name-bold block mt-2 mb-1 text-xl">
                    {car.maker} {car.model}
                  </strong>
                  <p
                    class={`car-availability text-lg ${car.isAvailable ? "text-limegreen" : "text-crimson"
                      }`}
                  >
                    {car.isAvailable ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "DreamCarPK",
  meta: [
    {
      name: "description",
      content: "DreamCarPK is your ultimate destination for car enthusiasts.",
    },
  ],
}; 
