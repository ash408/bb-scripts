/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];
  const currentHost = ns.args[1];

  if (server && ns.serverExists(server)) {
    ns.nuke(server);

    await ns.scp("scripts/intruder.js", server);
    ns.exec("scripts/intruder.js", server, 1, server);
  }

  else {
    ns.tprint("Server DNE");
    return
  }
}