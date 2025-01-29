import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="py-4 text-gray-500 dark:text-white">
      <div class="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} DreamCarPK. All rights reserved.
        </p>
      </div>
    </footer>
  );
});
