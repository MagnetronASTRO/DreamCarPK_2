import { component$, useResource$, Resource } from "@builder.io/qwik";

// Mock API Call (replace with your actual API endpoint)
//const fetchUserReservations = async (userId: string) => {
//  const response = await fetch(`/api/user-reservations/${userId}`);
//  if (!response.ok) {
//    throw new Error("Failed to fetch reservations");
//  }
//  return response.json();
//};

const fetchUserReservations = (userId: string) => {
  return [
    {
      id: 1,
      carMaker: "Honda",
      carModel: "Civic",
      pickupDate: "2025-01-20",
      returnDate: "2025-01-27",
      location: "New York",
      isActive: true
    },
    {
      id: 2,
      carMaker: "Toyota",
      carModel: "Corolla",
      pickupDate: "2024-12-15",
      returnDate: "2024-12-22",
      location: "Los Angeles",
      isActive: false
    }
  ];
};

export default component$(() => {
  // Replace with dynamic user ID from route or context
  const userId = "1"; // Example user ID
  const reservationsResource = useResource$(() => fetchUserReservations(userId));

  return (
    <div class="max-w-5xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Your Reservations</h1>
      <Resource
        value={reservationsResource}
        onPending={() => <div class="text-center text-lg">Loading your reservations...</div>}
        onRejected={(error) => <div class="text-red-500">Error: {error.message}</div>}
        onResolved={(reservations) => (
          <div class="grid gap-4">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  class="reservation-card p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <h2 class="text-xl font-semibold mb-2">
                    {reservation.carMaker} {reservation.carModel}
                  </h2>
                  <div class="grid grid-cols-2 gap-4 text-gray-700">
                    <div class="table-cell">
                      <span class="font-bold">Pickup Date: </span>
                      <span>{reservation.pickupDate}</span>
                    </div>
                    <div class="table-cell">
                      <span class="font-bold">Return Date: </span>
                      <span>{reservation.returnDate}</span>
                    </div>
                    <div class="table-cell">
                      <span class="font-bold">Location: </span>
                      <span>{reservation.location}</span>
                    </div>
                    <div class="table-cell">
                      <span class={`font-bold ${reservation.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {reservation.isActive ? "Active" : "Completed"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="text-center text-gray-500">No reservations found.</div>
            )}
          </div>
        )}
      />
    </div>
  );
});
