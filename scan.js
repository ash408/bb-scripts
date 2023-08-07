/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];

   if (server){
    const connections = ns.scan(server);

    for (let connection of connections){
      const hackLevel = ns.getHackingLevel();
      const serverLevel = ns.getServerRequiredHackingLevel(connection);

      if (hackLevel > serverLevel){
        const requiredPorts = ns.getServerNumPortsRequired(connection);

        if (requiredPorts == 0){
          await ns.scp("scripts/break.js", connection);
          ns.exec("scripts/break.js", connection);
        }
      }
    }
   }

   else {
    ns.tprint("Server DNE");
    return
   }
}