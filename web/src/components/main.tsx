import { component$, Slot } from "@builder.io/qwik";

export const Main = component$(() => {
  return (
    <main class="container mx-auto px-4 py-8">
      <div class="min-h-[calc(100vh-180px)]">
        <Slot />
      </div>
    </main>
  );
});
