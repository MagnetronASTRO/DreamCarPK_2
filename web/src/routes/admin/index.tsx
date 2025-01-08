import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const location = useLocation();
  return <div>Current location is {location.url.pathname.replaceAll("/", "").toUpperCase()}</div>;
});
