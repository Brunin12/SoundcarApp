import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import TabRoutes from "./tabs.routes";

function routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}

export default routes;
