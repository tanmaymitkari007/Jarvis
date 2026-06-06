import { motion } from "framer-motion";
import { useState } from "react";
import { LauncherState } from "../types/LauncherState";

type Props = {
  state: LauncherState;
  onSubmit: (command: string) => void;
  onEscape: () => void;
};

const VISUAL_CONFIG = {
  ORB_SIZE: 32,

  MORPH_WIDTH: 320,
  MORPH_HEIGHT: 2,

  BAR_WIDTH: 320,
  BAR_HEIGHT: 54,

  NUCLEUS_SIZE: 400,
};

export default function LauncherEntity({
  state,
  onSubmit,
  onEscape,
}: Props) {
  const [command, setCommand] = useState("");

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Escape") {
      onEscape();
      return;
    }

    if (event.key !== "Enter") {
      return;
    }

    const trimmedCommand = command.trim();

    if (!trimmedCommand) {
      return;
    }

    onSubmit(trimmedCommand);

    setCommand("");
  };

  const getWidth = () => {
    switch (state) {
      case LauncherState.HIDDEN:
        return 0;

      case LauncherState.ORB:
      case LauncherState.EXECUTING:
      case LauncherState.SUCCESS:
        return VISUAL_CONFIG.ORB_SIZE;

      case LauncherState.COLLAPSING:
      case LauncherState.MORPHING:
        return VISUAL_CONFIG.MORPH_WIDTH;

      case LauncherState.READY:
      case LauncherState.ERROR:
        return VISUAL_CONFIG.BAR_WIDTH;

      default:
        return 0;
    }
  };

  const getHeight = () => {
    switch (state) {
      case LauncherState.HIDDEN:
        return 0;

      case LauncherState.ORB:
      case LauncherState.EXECUTING:
      case LauncherState.SUCCESS:
        return VISUAL_CONFIG.ORB_SIZE;

      case LauncherState.COLLAPSING:
      case LauncherState.MORPHING:
        return VISUAL_CONFIG.MORPH_HEIGHT;

      case LauncherState.READY:
      case LauncherState.ERROR:
        return VISUAL_CONFIG.BAR_HEIGHT;

      default:
        return 0;
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

      {(state === LauncherState.ORB ||
        state === LauncherState.EXECUTING ||
        state === LauncherState.SUCCESS) && (
        <>
          <div className="orb-aura" />
          <div className="orb-ring" />
          <div className="orb-core" />
        </>
      )}

      {(state === LauncherState.READY ||
        state === LauncherState.ERROR) && (
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
            onKeyDown={handleKeyDown}
          />

          {state === LauncherState.ERROR && (
            <span className="error-message">
              Protocol not found
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}