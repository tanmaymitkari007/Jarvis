import "../styles/launcher.css";

import { useEffect, useRef } from "react";

import { useLauncherState } from "../hooks/useLauncherState";
import { LauncherState } from "../types/LauncherState";

import { hideLauncher } from "../services/windowService";

import LauncherEntity from "./LauncherEntity";

import { runProtocol } from "../services/protocolRunner";

import { listen } from "@tauri-apps/api/event";

export default function Launcher() {
  const { state, setState } = useLauncherState();

  const isSummoningRef = useRef(false);

  const sleep = (ms: number) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  useEffect(() => {
    const unlistenPromise = listen(
      "show-launcher",
      async () => {
        if (isSummoningRef.current) {
          return;
        }

        if (
          state !== LauncherState.HIDDEN
        ) {
          return;
        }

        isSummoningRef.current = true;

        setState(LauncherState.ORB);

        await sleep(450);

        setState(
          LauncherState.MORPHING
        );

        await sleep(450);

        setState(
          LauncherState.READY
        );

        isSummoningRef.current = false;
      }
    );

    return () => {
      unlistenPromise.then(
        (unlisten) => unlisten()
      );
    };
  }, [state]);

  const handleEscape = async () => {
    setState(
      LauncherState.COLLAPSING
    );

    await sleep(450);

    setState(
      LauncherState.ORB
    );

    await sleep(350);

    setState(
      LauncherState.HIDDEN
    );

    await hideLauncher();
  };

  const handleCommandSubmit = async (
    command: string
  ) => {


       console.log(
  "Submitted command:",
  JSON.stringify(command)
);


    try {
      setState(
        LauncherState.COLLAPSING
      );

      await sleep(450);

      setState(
        LauncherState.EXECUTING
      );

      await runProtocol(command);

      setState(
        LauncherState.SUCCESS
      );

      await sleep(500);

      setState(
        LauncherState.HIDDEN
      );

      await hideLauncher();
    } catch (error) {
      console.error(error);

      setState(
        LauncherState.ERROR
      );
    }
  };

  return (
    <div className="launcher-root">
      <LauncherEntity
        state={state}
        onSubmit={handleCommandSubmit}
        onEscape={handleEscape}
      />
    </div>
  );
}