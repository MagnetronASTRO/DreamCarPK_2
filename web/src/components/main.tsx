import { component$, Slot } from "@builder.io/qwik";

export const Main = component$(() => {
  return (
    <main class="container mx-auto sm:px-4">
      <div class="min-h-[calc(100vh-180px)]">
        <Slot />
      </div>
    </main>
  );
});
