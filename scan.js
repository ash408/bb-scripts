/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];

  ns.tprint(`Running scan from ${server}`)

   if (server){
    const connections = ns.scan(server);

    for (let connection of connections){
      ns.tprint(`Discovered ${connection} from ${server}`)

      const hackLevel = ns.getHackingLevel();
      const serverLevel = ns.getServerRequiredHackingLevel(connection);

      if (hackLevel > serverLevel){
        const requiredPorts = ns.getServerNumPortsRequired(connection);

        if (requiredPorts == 0){
          ns.tprint(`Connecting to ${connection}`);
          await ns.scp(["scripts/break.js", "scripts/scan.js", "scripts/thief.js"], connection);
          ns.exec("scripts/break.js", connection, 1, connection);
        }
      }
    }
   }

   else {
    ns.tprint("Server DNE");
    return
   }
}