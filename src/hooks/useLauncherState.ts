import { useState } from "react";
import { LauncherState } from "../types/LauncherState";

export function useLauncherState() {
  const [state, setState] = useState<LauncherState>(
    LauncherState.ORB
  );

  return {
    state,
    setState,
  };
}