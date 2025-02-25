'use client'

import { useRef } from "react";
import { motion } from "framer-motion";

export default function DraggableBox() {
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      style={{
        width: "100%",
        height: "500px",
        border: "2px solid #ccc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        className="size-24 bg-[#3498db] rounded-xl"
        style={{
          cursor: "grab",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
