import React from "react";
import PlaygroundContent from "./PlaygroundContent";
import PlayroundHeader from "./PlayroundHeader";

function Playground({ isSideBarOpen }) {
  return (
    <div id="playground">
      <PlayroundHeader isSideBarOpen={isSideBarOpen} />
      <PlaygroundContent />
    </div>
  );
}

export default Playground;
