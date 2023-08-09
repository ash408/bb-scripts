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

          const files = ns.ls("home", ".js");
          ns.tprint(`Uploading ${files} to ${connection}`);
          await ns.scp(files, connection);
            
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