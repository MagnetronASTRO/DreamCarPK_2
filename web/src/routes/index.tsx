import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead } from "@builder.io/qwik-city";

// Import images for mock data
import HondaCivicImage from "~/media/honda_civic.jpg?jsx";
import FordMustangImage from "~/media/ford_mustang.jpg?jsx";
import DefaultCarImage from "~/media/vecteezy_car-icon-vector-illustration_.jpg?jsx";

export default component$(() => {
  const cars = [
    { id: 1, maker: "Honda", model: "Civic", isAvailable: true, photo: HondaCivicImage },
    { id: 2, maker: "Ford", model: "Mustang", isAvailable: true, photo: FordMustangImage },
    { id: 3, maker: "Toyota", model: "Corolla", isAvailable: false, photo: DefaultCarImage },
    { id: 4, maker: "Ford", model: "Mustang", isAvailable: true, photo: FordMustangImage },
    { id: 5, maker: "Honda", model: "Civic", isAvailable: true, photo: HondaCivicImage },
    { id: 6, maker: "Ford", model: "Mustang", isAvailable: true, photo: FordMustangImage },
    { id: 7, maker: "Toyota", model: "Corolla", isAvailable: false, photo: DefaultCarImage },
  ];

  return (
    <div class="cars-wrapper p-4">
      <h1 class="text-2xl font-bold mb-6">Available Cars</h1>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link href={`/car/${car.id}`} class="car-wrapper-submit" key={car.id}>
            <div class="car-card-container">
              <div class="group car-card border shadow-sm transition-all hover:shadow-md">
                <div class="img-container relative transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <car.photo class="w-full h-full object-cover" />
                  {/* Gradient overlay */}
                  <div class="absolute inset-0 bg-gradient-to-t from-white/100 to-transparent pointer-events-none top-[80%]"></div>
                </div>
                <div class="car-description text-center relative z-20">
                  <strong class="car-name-bold block mt-2 mb-0 text-xl">
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
          </Link>
        ))}
      </div>
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
