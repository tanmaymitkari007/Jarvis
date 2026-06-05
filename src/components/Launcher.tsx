import { useEffect } from "react";

import "../styles/launcher.css";

import { useLauncherState } from "../hooks/useLauncherState";
import { LauncherState } from "../types/LauncherState";
import LauncherEntity from "./LauncherEntity";

export default function Launcher() {
  const { state, setState } = useLauncherState();

  useEffect(() => {
    const orbTimer = setTimeout(() => {
      setState(LauncherState.MORPHING);
    }, 500);

    const readyTimer = setTimeout(() => {
      setState(LauncherState.READY);
    }, 1000);

    return () => {
      clearTimeout(orbTimer);
      clearTimeout(readyTimer);
    };
  }, [setState]);

  return (
    <div className="launcher-root">
      <LauncherEntity state={state} />
    </div>
  );
}