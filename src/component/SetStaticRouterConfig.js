import React from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import {useAuth} from "../context/auth"
import axios from "axios";

function SetStaticRouterConfig({ currentRouter }) {
  const alert = useAlert();

  const { register, handleSubmit, errors } = useForm();
  const {authTokens} =  useAuth();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`http://localhost:8081/router/${currentRouter}`, data, 
		{
		  headers:{
		  Authorization:JSON.parse(authTokens).token
		  }
		}
	  )
      .then(function (response) {
        if (response.data[0].command_result[0].result === "success") {
          alert.success("Address sended successfull");
        } else {
          alert.error(response.data[0].command_result[0].details);
        }
      })
      .catch(function (error) {
        alert.error("Error 500, unhandled error");
      });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <label className="text-purple-600 font-bold">
        Set Static Config for: {currentRouter}{" "}
      </label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm p-1 rounded overflow-hidden shadow-lg">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="destination"
          >
            Destination:
          </label>
          <input
            name="destination"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="XXX.XXX.XXX.XXX/XX"
            ref={register({ required: "You must  privider a destination" })}
          />

          {errors.destination && (
            <span role="alert">
              <div
                className="m-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Holy smokes: </strong>
                <span className="block sm:inline">
                  {errors.destination.message}
                </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
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

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="gateway"
          >
            Gateway:
          </label>
          <input
            name="gateway"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="XXX.XXX.XXX.XXX"
            ref={register({ required: "You must  privider a gateway" })}
          />
          {errors.gateway && (
            <span role="alert">
              <div
                className="m-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Holy smokes: </strong>
                <span className="block sm:inline">
                  {errors.gateway.message}
                </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
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
            className="m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetStaticRouterConfig;
