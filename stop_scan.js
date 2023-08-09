/** @param {NS} ns */
export async function main(ns) {
  const server = ns.getHostname();
  await ns.sleep(1000);
  
  const connections = ns.scan(server);

  for (let connection of connections){
    if (ns.hasRootAccess(connection)){
      ns.kill("scripts/scan.js", connection);
      ns.exec("scripts/stop_scan.js", connection)
    }
  }
}