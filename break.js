/** @param {NS} ns */
export async function main(ns) {
  const server = ns.getHostname();
  
  ns.nuke(server);
  ns.tprint(`Breaking ${server}`);
  await ns.sleep(1000);

  ns.tprint(`Spawning new scanner on ${server}`)
  await ns.sleep(1000);
  ns.spawn("scripts/scan.js", 1, server);
}