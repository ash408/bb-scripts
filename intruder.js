/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];
  const currentHost = ns.args[1];

  if (server && currentHost) {
    await ns.scp("scripts/scan.js", currentHost, server);
    ns.run("scripts/scan.js", 1, currentHost);
  }

  else {
    ns.tprint("Server DNE");
    return
  }
}