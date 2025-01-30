import { component$, Resource } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  type RequestEvent,
  useLocation,
} from "@builder.io/qwik-city";

import DefaultCarImage from "~/media/vecteezy_car-icon-vector-illustration_.jpg?jsx";

const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  is_available: boolean;
  specs?: { power: number; color: string };
  photos?: { photo_name: string }[];
}

export const useCarLoader = routeLoader$<Car | null>(
  async (requestEvent: RequestEvent) => {
    const { cookie, sharedMap, params } = requestEvent;

    const user = sharedMap.get("user");
    if (!user) {
      throw requestEvent.redirect(302, "/auth/login");
    }

    const carId = params.id;
    if (!carId) {
      throw requestEvent.error(400, "Car ID not found in route params");
    }

    const tokenCookie = cookie.get("auth_token");
    if (!tokenCookie?.value) {
      throw requestEvent.redirect(302, "/auth/login");
    }

    const token = tokenCookie.value;

    const response = await fetch(
      `${endpoint}/cars/${carId}?include=specs,photos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw requestEvent.error(
        response.status,
        `Failed to fetch car details: ${response.statusText}`,
      );
    }

    const carData = await response.json();
    return carData as Car;
  },
);

export default component$(() => {
  const location = useLocation();

  const carResource = useCarLoader();

  return (
    <div class="mx-full max-w-7xl p-6">
      <Resource
        value={carResource}
        onPending={() => (
          <div class="text-center text-lg">Loading car details...</div>
        )}
        onRejected={(error) => (
          <div class="text-red-500">Error: {error.message}</div>
        )}
        onResolved={(car) => {
          if (!car) {
            return <div class="text-gray-500">No car found.</div>;
          }

          return (
            <>
              <h5 class="mb-4 text-2xl font-bold">
                {car.make} {car.model} ({car.year})
              </h5>

              <div class="flex flex-col gap-6 md:flex-row">
                <div class="flex1">
                  <DefaultCarImage class="w-full rounded-lg shadow-lg" />
                </div>{" "}
                <div class="flex-1 space-y-6">
                  {car.specs && (
                    <div>
                      <h6 class="mb-3 text-xl font-semibold">Specifications</h6>
                      <table class="w-full border-collapse">
                        <tbody>
                          <tr class="border-b">
                            <td class="px-1 py-2 font-semibold text-gray-700">
                              Power
                            </td>
                            <td class="px-1 py-2">{car.specs.power} HP</td>
                          </tr>
                          <tr class="border-b">
                            <td class="px-1 py-2 font-semibold text-gray-700">
                              Color
                            </td>
                            <td class="px-1 py-2">{car.specs.color}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <form method="post" action="/reservations" class="space-y-2">
                    <input type="hidden" name="car_id" value={car.id} />
                    <h6 class="text-xl font-semibold">Rent This Car</h6>

                    <label class="block">
                      <span class="text-gray-700">Rental Start Date</span>
                      <input
                        type="date"
                        name="reservation_date"
                        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        required
                      />
                    </label>

                    <label class="block">
                      <span class="text-gray-700">Rental End Date</span>
                      <input
                        type="date"
                        name="return_date"
                        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        required
                      />
                    </label>
                    <button
                      type="submit"
                      class="w-full rounded-lg bg-green-500 py-2 font-bold text-white transition-colors hover:bg-green-600"
                    >
                      Rent Now
                    </button>
                  </form>
                </div>
              </div>
            </>
          );
        }}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Car Details",
  meta: [
    {
      name: "description",
      content: "DreamCarPK is your ultimate destination for car enthusiasts.",
    },
  ],
};
