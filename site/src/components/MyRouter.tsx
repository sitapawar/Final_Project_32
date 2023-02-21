

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Ratty } from "./pages/Ratty";
import { Andrews } from "./pages/Andrews";
import { Vdub } from "./pages/Vdub";
import { Unfound } from "./pages/Unfound";

function MyRouter() {
    return(
      <div>
        <Routes >
          <Route path="/home" element = {<Home />}>
          </Route>
          <Route path="/ratty" element = {<Ratty />}>
          </Route>
          <Route path="/andrews" element = {<Andrews />}>
          </Route>
          <Route path="/vdub" element = {<Vdub />}>
          </Route>
          <Route path="/" element = {<Home />}>
          </Route>
          <Route path="/brownyelp" element = {<Home />}>
          </Route>
          <Route path="*" element = {<Unfound />}>
          </Route>
        </Routes>
      </div>
        
        )
}

export default MyRouter;
