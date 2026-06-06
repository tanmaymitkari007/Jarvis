import jarvisProtocol from "../protocols/jarvis.json";

import { Protocol } from "../types/Protocol";

import { executeAction } from "./actionExecutor";

export function getProtocol(
  protocolName: string
): Protocol | null {
  const protocols: Protocol[] = [
    jarvisProtocol as Protocol,
  ];

  const protocol = protocols.find(
    (p) =>
      p.name.toLowerCase() ===
      protocolName.toLowerCase()
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