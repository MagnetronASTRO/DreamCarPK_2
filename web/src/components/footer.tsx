import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="bg-gray-900 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} DreamCarPK. All rights reserved.</p>
      </div>
    </footer>
  );
});
