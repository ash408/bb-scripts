/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];
  ns.tprint(`Running scan from ${server}`)
  await ns.sleep(1000);
  
  const connections = ns.scan(server);

  for (let connection of connections){
    ns.tprint(`Discovered ${connection} from ${server}`)
    await ns.sleep(1000);

    const hackLevel = ns.getHackingLevel();
    const serverLevel = ns.getServerRequiredHackingLevel(connection);

    if (hackLevel > serverLevel && connection != "home"){
      const requiredPorts = ns.getServerNumPortsRequired(connection);

      if (requiredPorts == 0){
        ns.tprint(`Connecting to ${connection}`);
        await ns.sleep(1000);

        const files = ["scripts/scan.js", "scripts/break.js", 
          "scripts/thief_runner.js", "scripts/thief.js", "scripts/stop_scan.js"];
          
        ns.tprint(`Uploading ${files} to ${connection}`);
        await ns.scp(files, connection);
            
        ns.exec("scripts/break.js", connection, 1, connection);
        await ns.sleep(1000);
      }
    }

    else {
      ns.tprint("Avoiding running scan on home");
      await ns.sleep(1000);
    }
  }
}