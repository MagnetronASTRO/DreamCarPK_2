import { component$, Resource } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;

interface Car {
  id: number;
  make: string;
  model: string;
  is_available: boolean;
}

interface Reservation {
  id: number;
  user_id: number;
  reservation_date: string;
  return_date: string;
  is_returned: boolean;
  car: Car;
}

export const useAuthGuard = routeLoader$(async (requestEvent: RequestEvent) => {
  const { sharedMap } = requestEvent;

  const user = sharedMap.get("user");
  if (!user) {
    throw requestEvent.redirect(302, "/auth/login");
  }
});

export const useReservations = routeLoader$<Reservation[]>(
  async (requestEvent) => {
    const { cookie, sharedMap } = requestEvent;

    const user = sharedMap.get("user") as { id: number } | undefined;
    if (!user?.id) {
      return [];
    }

    const tokenCookie = cookie.get("auth_token");
    const token = tokenCookie.value;

    const response = await fetch(`${endpoint}/reservations?include=car`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reservations: ${response.statusText}`);
    }

    const data = await response.json();
    // Return the array of reservations
    return data as Reservation[];
  },
);

// 5) Build your UI using the Resource
export default component$(() => {
  useAuthGuard();
  const reservationsResource = useReservations();

  return (
    <div class="mx-auto max-w-5xl p-6">
      <h1 class="mb-6 text-2xl font-bold">Your Reservations</h1>
      <Resource
        value={reservationsResource}
        onPending={() => (
          <div class="text-center text-lg">Loading your reservations...</div>
        )}
        onRejected={(error) => (
          <div class="text-red-500">Error: {error.message}</div>
        )}
        onResolved={(reservations) => (
          <div class="grid gap-4">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  class="reservation-card rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h2 class="mb-2 text-xl font-semibold">
                    {reservation.car.make} {reservation.car.model}
                  </h2>
                  <div class="grid grid-cols-2 gap-4 text-gray-700">
                    <div class="table-cell">
                      <span class="font-bold">Pickup Date: </span>
                      <span>{reservation.reservation_date}</span>
                    </div>
                    <div class="table-cell">
                      <span class="font-bold">Return Date: </span>
                      <span>{reservation.return_date}</span>
                    </div>
                    {/* <div class="table-cell"> */}
                    {/*   <span class="font-bold">Location: </span> */}
                    {/*   <span>{reservation.location}</span> */}
                    {/* </div> */}
                    <div class="table-cell">
                      <span
                        class={`font-bold ${reservation.is_returned ? "text-green-600" : "text-red-600"}`}
                      >
                        {reservation.is_returned ? "Active" : "Completed"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="text-center text-gray-500">
                No reservations found.
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Reservations",
  meta: [
    {
      name: "description",
      content: "DreamCarPK is your ultimate destination for car enthusiasts.",
    },
  ],
};
