import { component$, Resource } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

// Default image when no photo is available
import DefaultCarImage from "~/media/vecteezy_car-icon-vector-illustration_.jpg";

const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;

interface Car {
  id: number;
  make: string;
  model: string;
  is_available: boolean;
  photos?: { photo_name: string }[];
}

const DEFAULT_IMAGE_WIDTH = 100;
const DEFAULT_IMAGE_HEIGHT = 100;

// Fetch cars from Laravel API using `routeLoader$` (Server-side loader)
export const useCars = routeLoader$<Car[]>(async () => {
  const res = await fetch(`${endpoint}/cars?include=photos`);
  const data = await res.json();

  if (res.ok) {
    return data.map((car: Car) => ({
      ...car,
      photo:
        car.photos && car.photos.length > 0
          ? car.photos[0].photo_name
          : DefaultCarImage,
    }));
  }
});

export default component$(() => {
  const cars = useCars(); // Get data from route loader

  return (
    <div class="cars-wrapper p-3">
      <h2 class="mb-6 text-2xl font-bold">Available Cars</h2>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Resource
          value={cars}
          onPending={() => <p>Loading cars...</p>}
          onRejected={() => <p>Error loading cars.</p>}
          onResolved={(cars) => (
            <>
              {cars.map((car) => (
                <Link
                  href={`/car/${car.id}`}
                  class="car-wrapper-submit"
                  key={car.id}
                >
                  <div class="car-card-container">
                    <div class="car-card group border shadow-sm transition-all hover:shadow-md">
                      <div class="img-container duration-499 relative transition-transform ease-in-out group-hover:scale-110">
                        <img
                          src={car.photo}
                          alt={`${car.make} ${car.model}`}
                          width={DEFAULT_IMAGE_WIDTH}
                          height={DEFAULT_IMAGE_HEIGHT}
                          class="h-auto w-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div class="pointer-events-none absolute inset-0 top-[80%] bg-gradient-to-t from-white/100 to-transparent"></div>
                      </div>
                      <div class="car-description z-19 relative text-center">
                        <strong class="car-name-bold mb-0 mt-1 block text-xl">
                          {car.make} {car.model}
                        </strong>
                        <p
                          class={`car-availability text-lg ${car.is_available ? "text-limegreen" : "text-crimson"}`}
                        >
                          {car.is_available ? "Available" : "Not Available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        />
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
