import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <header class="bg-gray-800 text-white shadow-md">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/home"><div class="text-lg font-bold">DreamCarPK</div></a>
        <ul class="hidden md:flex space-x-4">
          <li><a href="/home" class="hover:text-gray-400">Home</a></li>
          <li><a href="/reservations" class="hover:text-gray-400">Reservations</a></li>
          <li><a href="/admin" class="hover:text-gray-400">Admin</a></li>
          <li><a href="/login" class="hover:text-gray-400">Login</a></li>
          <li><a href="/logout" class="hover:text-gray-400">Logout</a></li>
        </ul>
        <button class="md:hidden text-xl">
          <span>☰</span> {/* Add functionality later */}
        </button>
      </nav>
    </header>
  );
});
