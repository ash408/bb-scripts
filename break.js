/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0]

  if (server && ns.serverExists(server)) {
    ns.nuke(server);

    await ns.scp("scripts/thief.js", server);
    ns.exec("scripts/thief.js", server, 1, server);
  }

  else {
    ns.tprint("Server DNE");
    return
  }
}