import MindmapCanvas from "@/components/mindmap-canvas";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

const CreateMapPage = () => {
  return (
    <>
      <ReactFlowProvider>
        <MindmapCanvas />
      </ReactFlowProvider>
    </>
  );
};

export default CreateMapPage;
