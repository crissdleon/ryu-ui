import React from "react";
import { useForm } from "react-hook-form";
import {useAlert} from 'react-alert'

import axios from "axios";

function RouterConfig({ currentRouter }) {
  const alert = useAlert()

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
	console.log(data)
    axios
	  .post(`http://localhost:8081/router/${currentRouter}`, data)
      .then(function (response) {
        alert.success("Address sended successfull")	
        console.table(response);
      })
      .catch(function (error) {
		alert.error("Error 500, unhandled error")
      });
  };

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">

      <label className="text-purple-600 font-bold">Set Config for: {currentRouter} </label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm p-1 rounded overflow-hidden shadow-lg">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            IP:
          </label>
          <input
            name="address"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="0.0.0.0"
            ref={register({ required: "You must to privider a IP" })}
          />
        </div>

        {errors.address && (
          <span role="alert">
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Holy smokes: </strong>
              <span class="block sm:inline">{errors.address.message}</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </span>
        )}
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default RouterConfig;
