import { component$, useResource$, Resource } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import HondaCivicImage from "~/media/honda_civic.jpg?jsx";
//import FordMustangImage from "~/media/ford_mustang.jpg?jsx";
//import DefaultCarImage from "~/media/vecteezy_car-icon-vector-illustration_.jpg?jsx";

// Mock API Call (replace with your actual API endpoint)
//const fetchCarDetails = async (carId: string) => {
//  const response = await fetch(`/api/car-details/${carId}`);
//  if (!response.ok) {
//    throw new Error("Failed to fetch car details");
//  }
//  return response.json();
//};

const fetchCarDetails = (carId: number) => {
  return {
    id: carId,
    maker: "Honda " + carId,
    model: "Civic",
    photo: 'honda_civic.jpg',
    specifications: {
      Engine: "2.0L I4",
      Transmission: "Automatic",
      FuelType: "Petrol",
      SeatingCapacity: "5",
    }
  };
};

export default component$(() => {
  const location = useLocation();
  const carId: number = parseInt(location.params.id);

  const carDetailsResource = useResource$(() => fetchCarDetails(carId));

  return (
    <div class="max-w-4xl mx-auto p-6">
      <Resource
        value={carDetailsResource}
        onPending={() => <div class="text-center text-lg">Loading car details...</div>}
        onRejected={(error) => <div class="text-red-500">Error: {error.message}</div>}
        onResolved={(car) => (
          <>
            <h3 class="text-2xl font-bold mb-4">{car.maker} {car.model}</h3>
            <div class="flex flex-col md:flex-row gap-6">
              {/* Car Photo */}
              <div class="flex-1">
                <HondaCivicImage class="w-full rounded-lg shadow-lg" />
              </div>

              {/* Car Specs and Form */}
              <div class="flex-1 space-y-6">
                {/* Car Specifications */}
                <div>
                  <h4 class="text-xl font-semibold mb-3">Specifications</h4>
                  <table class="w-full border-collapse">
                    <tbody>
                      {Object.entries(car.specifications).map(([key, value]) => (
                        <tr key={key} class="border-b">
                          <td class="py-2 px-3 font-semibold text-gray-700">{key}:</td>
                          <td class="py-2 px-3">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Rent Form */}
                <form method="post" action="/rent-car" class="space-y-4">
                  <input type="hidden" name="carId" value={car.id} />
                  <h4 class="text-xl font-semibold">Rent This Car</h4>
                  <label class="block">
                    <span class="text-gray-700">Your Name</span>
                    <input
                      type="text"
                      name="name"
                      class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500"
                      placeholder="Enter your name"
                      required
                    />
                  </label>
                  <label class="block">
                    <span class="text-gray-700">Rental Start Date</span>
                    <input
                      type="date"
                      name="startDate"
                      class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    class="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Rent Now
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
});
