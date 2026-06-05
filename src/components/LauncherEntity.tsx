import { motion } from "framer-motion";
import { useState } from "react";
import { LauncherState } from "../types/LauncherState";

type Props = {
  state: LauncherState;
};

const VISUAL_CONFIG = {
  // Initial orb size
  ORB_SIZE: 64,

  // Morph phase dimensions
  MORPH_WIDTH: 320,
  MORPH_HEIGHT: 20,

  // Final input bar dimensions
  BAR_WIDTH: 320,
  BAR_HEIGHT: 54,

  // Left identity icon
  NUCLEUS_SIZE: 12,
};

export default function LauncherEntity({ state }: Props) {
  const [command, setCommand] = useState("");

  const getWidth = () => {
  switch (state) {
    case LauncherState.ORB:
      return VISUAL_CONFIG.ORB_SIZE;

    case LauncherState.MORPHING:
      return VISUAL_CONFIG.MORPH_WIDTH;

    case LauncherState.READY:
      return VISUAL_CONFIG.BAR_WIDTH;

    default:
      return VISUAL_CONFIG.ORB_SIZE;
     }
     };

  const getHeight = () => {
  switch (state) {
    case LauncherState.ORB:
      return VISUAL_CONFIG.ORB_SIZE;

    case LauncherState.MORPHING:
      return VISUAL_CONFIG.MORPH_HEIGHT;

    case LauncherState.READY:
      return VISUAL_CONFIG.BAR_HEIGHT;

    default:
      return VISUAL_CONFIG.ORB_SIZE;
     }
     };

  return (
    <motion.div
      className="launcher-entity"
      initial={{
        width: 0,
        height: 0,
        opacity: 0,
      }}
      animate={{
        width: getWidth(),
        height: getHeight(),
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
        <div className="energy-aura" />
      <div className="energy-core" />

             {state === LauncherState.ORB && (
               <>
              <div className="orb-aura" />
              <div className="orb-ring" />
              <div className="orb-core" />
              </>
             )}

      {state === LauncherState.READY && (
        <motion.div
          className="input-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.12,
            duration: 0.25,
          }}
        >
          <span className="jarvis-icon">✦</span>

          <span className="prompt">&gt;</span>

          <input
            className="command-input"
            autoFocus
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </motion.div>
      )}
    </motion.div>
  );
}