import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

const MindmapEdges = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, selected, style } = props;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Get the color from style or default to gray
  const edgeColor = style?.stroke || '#d1d5db';

  return (
    <BaseEdge 
      path={edgePath} 
      {...props}
      style={{
        strokeWidth: selected ? 2.5 : 2,
        stroke: edgeColor,
      }}
    />
  );
};

export default MindmapEdges;
