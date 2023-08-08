/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];

  if (server && ns.serverExists(server)) {
    ns.nuke(server);
    ns.tprint(`Breaking ${server}`);

    ns.tprint(`Spawning new scanner on ${server}`)
    ns.spawn("scripts/scan.js", 1, server);
  }

  else {
    ns.tprint("Server DNE");
    return
  }
}