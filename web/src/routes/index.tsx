import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
    {/* Top Navigation */}
      <header class="bg-gray-800 text-white shadow-md">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
          <div class="text-lg font-bold">DreamCarPK</div>
          <ul class="hidden md:flex space-x-4">
            <li><a href="/" class="hover:text-gray-400">Home</a></li>
            <li><a href="/about" class="hover:text-gray-400">Reservations</a></li>
            <li><a href="/contact" class="hover:text-gray-400">Contact</a></li>
          </ul>
          <button class="md:hidden text-xl">
            <span>☰</span> {/* Add functionality later */}
          </button>
        </nav>
      </header>

      {/* Page Content */}
      <main class="container mx-auto px-4 py-8">
        <div class="min-h-[calc(100vh-160px)]">
          {/* Content goes here */}
        </div>
      </main>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-4">
        <div class="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} DreamCarPK. All rights reserved.</p>
        </div>
      </footer>
    </>
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
