import React, { useState, useEffect } from "react";
import ListRouter from "./ListRouter";
import RouterConfig from "./ConfigRouter";
import ListRouterConfig from "./ListRouterConfig";
import DeleteConfig from "./DeleteConfig";
import SetStaticRouterConfig from "./SetStaticRouterConfig";
import JSONViewer from "react-json-viewer";
import DeleteStaticRouterConfig from "./DeleteStaticRouterConfig";
import axios from "axios";

function Body() {
  const [currentRouter, setCurrentRouter] = useState("");
  const [currentConfig, setCurrentConfig] = useState();
  const [router, setRouter] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/router/${currentRouter}`)
      .then((response) => {
        const data = response.data;
        if (data !== undefined) setRouter((_) => data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setRouter([]);
    };
  }, [currentRouter]);
  const dashboard =
    router !== undefined ? (
      <div>

		<h3>Actual Config:</h3>
        {" "}
        <JSONViewer json={router} />{" "}
      </div>
    ) : null;
  return (
    <div className="container  h-auto p-4">
      <div class="px-2">
        <div class="flex -mx-2">
          <div class="w-1/3 px-2">
            <ListRouter currentRouter={setCurrentRouter} />
          </div>

          <div class="w-1/3 px-2">
            <ListRouterConfig currentConfig={setCurrentConfig} />
          </div>

          <div class="w-1/3 px-2">
            {currentConfig === "addIp" ? (
              <RouterConfig currentRouter={currentRouter} />
            ) : currentConfig === "deleteIp" ? (
              <DeleteConfig currentRouter={currentRouter} />
            ) : //	<RouterConfig currentRouter= {currentRouter} />
            currentConfig === "addRoute" ? (
              <SetStaticRouterConfig currentRouter={currentRouter} />
            ) : //	<RouterConfig currentRouter= {currentRouter} />
            currentConfig === "deleteRute" ? (
              <DeleteStaticRouterConfig currentRouter={currentRouter} />
            ) : //	<RouterConfig currentRouter= {currentRouter} />
            null}
          </div>
        </div>
      </div>
      <div className="mt-4">{dashboard}</div>
    </div>
  );
}

export default Body;
