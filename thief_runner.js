/** @param {NS} ns */
export async function main(ns) {
  const server = ns.getHostname();
  ns.tprint(`Running scan from ${server}`)
  await ns.sleep(1000);
  
  const connections = ns.scan(server);

  for (let connection of connections){
    ns.tprint(`Discovered ${connection} from ${server}`)
    await ns.sleep(1000);

    if (ns.hasRootAccess(connection)){
        
      await ns.sleep(1000);
      const isActive = ns.isRunning("scripts/thief.js", connection);

      if (!isActive && connection != "home"){
        ns.exec("scripts/thief_runner.js", connection, 1, connection);

        while(ns.isRunning("scripts/thief_runner.js", connection)){
          await ns.sleep(1000);
        }
        
        ns.exec("scripts/thief.js", connection, 1, connection);
      }

      else if (connection == "home"){
        ns.tprint("Can't run Thief on home");
        await ns.sleep(1000);
      }

      else {
        ns.tprint(`Thief is already running on ${connection}`);
        await ns.sleep(1000);
      }
    }
  }
}