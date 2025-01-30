import { component$, $, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { useUser } from "~/routes/layout";

export const Header = component$(() => {
  const user = useUser();
  const nav = useNavigate();

  const logout = $(() => {
    document.cookie = "auth_token=; Max-Age=-99999999;";
    nav("/", { replaceState: true, forceReload: true });
  });

  return (
    <header class="relative z-50 flex w-full flex-wrap bg-white py-3 text-lg dark:bg-neutral-800 sm:flex-nowrap sm:justify-start">
      <nav class="mx-auto w-full px-6 sm:flex sm:items-center sm:justify-between sm:px-8">
        <div class="flex items-center justify-between">
          <a
            class="flex-none text-2xl font-semibold focus:opacity-80 focus:outline-none dark:text-white"
            href="/"
            aria-label="Brand"
          >
            DreamCarPK
          </a>
          <div class="sm:hidden">
            <button
              type="button"
              class="hs-collapse-toggle relative flex size-7 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              id="hs-navbar-example-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-example"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-example"
            >
              <svg
                class="size-4 shrink-0 hs-collapse-open:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hidden size-4 shrink-0 hs-collapse-open:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span class="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-example"
          class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div class="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
            <a
              class="font-medium text-blue-500 focus:outline-none"
              href="/"
              aria-current="page"
            >
              Cars
            </a>
            {user.value && (
              <a
                class="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="/reservations"
              >
                Reservations
              </a>
            )}
            {!user.value && (
              <a
                class="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="/auth/login"
              >
                Login
              </a>
            )}

            {user.value && (
              <div class="hs-dropdown relative inline-flex">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  class="hs-dropdown-toggle inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  Settings
                  <svg
                    class="size-4 hs-dropdown-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  class="hs-dropdown-menu duration mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:border dark:border-neutral-700 dark:bg-neutral-800"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div class="border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
                    <p class="text-lg text-gray-500 dark:text-neutral-400">
                      Signed in as
                    </p>
                    <p class="text-lg font-medium text-gray-800 dark:text-neutral-300">
                      {user.value.email}
                    </p>
                  </div>
                  <div class="space-y-0.5 p-1">
                    <a
                      class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-lg text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                      href="#"
                    >
                      <svg
                        class="size-4 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Account settings
                    </a>
                    <a
                      class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-lg text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                      href="#"
                      onClick$={logout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-log-out"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                      </svg>{" "}
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});
