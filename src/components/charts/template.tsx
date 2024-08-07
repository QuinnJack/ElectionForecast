import React from "react";
import { Zoom } from "@visx/zoom";

const Datawrapper = ({
  width = "100%",
  height = "100%",
  style = { width: "100%", height: "100%" },
  ...props
}) => {
  const initialScale = 1;
  const centerX = 0; // Adjusted to center the map
  const centerY = 0; // Adjusted to center the map

  return (
    <Zoom<SVGSVGElement>
      width={2812} // Original width for Zoom
      height={1600} // Original height for Zoom
      scaleXMin={0.9}
      scaleXMax={9}
      scaleYMin={0.9}
      scaleYMax={9}
      initialTransformMatrix={{
        scaleX: initialScale,
        scaleY: initialScale,
        translateX: -10,
        translateY: 10,
        skewX: 0,
        skewY: 0,
      }}
    >
      {(zoom) => (
        <div className="zoom-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-label="Map of Canada, Lambert Projection"
            viewBox="4 4 1075 911"
            width={width}
            height={height}
            style={{ ...style, touchAction: "none" }}
            ref={zoom.containerRef}
            {...props}
          >
            <defs> </defs>
            <g className="paths" transform={zoom.toString()}></g>
            {/* intercept all mouse events */}
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={(event) => {
                zoom.dragStart(event);
                (event.currentTarget as SVGRectElement).style.cursor =
                  "grabbing";
              }}
              onMouseMove={zoom.dragMove}
              onMouseUp={(event) => {
                zoom.dragEnd();
                (event.currentTarget as SVGRectElement).style.cursor = "grab";
              }}
              onMouseLeave={(event) => {
                if (zoom.isDragging) {
                  zoom.dragEnd();
                  (event.currentTarget as SVGRectElement).style.cursor = "grab";
                }
              }}
              style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
            />
          </svg>
          <div className="controls"></div>
        </div>
      )}
    </Zoom>
  );
};

export default Datawrapper;
