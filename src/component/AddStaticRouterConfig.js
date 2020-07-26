import React from "react";

function AddStaticRouterConfig({ currentRouter }) {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <label className="text-purple-600 font-bold">Set Config for: </label>
      <div className="max-w-sm p-1 rounded overflow-hidden shadow-lg">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          IP:
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />

      </div>
    </div>
  );
}

export default AddStaticRouterConfig;
