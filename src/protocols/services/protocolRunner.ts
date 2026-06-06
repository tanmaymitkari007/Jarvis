import protocolsData from "../protocols.json";

import { Protocol } from "../../types/Protocol";

import { executeAction } from "./actionExecutor";

function getProtocols(): Protocol[] {
  return protocolsData.protocols as Protocol[];
}

export function getProtocol(
  protocolName: string
): Protocol | null {
  const search = protocolName
  .trim()
  .toLowerCase();


  const protocol = getProtocols().find(
    (p) =>
      p.name.toLowerCase() === search ||
      p.aliases?.some(
        (alias) =>
          alias.toLowerCase() === search
      )
  );

  return protocol ?? null;
}

export async function runProtocol(
  protocolName: string
) {
  const protocol =
    getProtocol(protocolName);

  if (!protocol) {
    throw new Error(
      `Protocol not found: ${protocolName}`
    );
  }

  for (const action of protocol.actions) {
    await executeAction(action);
  }
}