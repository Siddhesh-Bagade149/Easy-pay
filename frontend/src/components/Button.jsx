export function Button({ label, onclick }) {
  return (
    <button
      type="button"
      onclick={onclick}
      class="w-full text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  px-5 py-2.5 mt-4"
    >
      {label}
    </button>
  );
}
