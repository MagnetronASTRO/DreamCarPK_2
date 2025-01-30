import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import type { IStaticMethods } from "preline/preline";
import { Header } from "~/components/header";
import { Main } from "~/components/main";
import { Footer } from "~/components/footer";
import type { User } from "~/routes/plugin@auth";

// TODO: move to routes that will use preline components
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user") as User;
});

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <Header />
      <Main>
        <Slot />
      </Main>
      <Footer />
    </>
  );
});

// TODO
//useVisibleTask$(() => {
//  window.HSStaticMethods.autoInit();
//});
