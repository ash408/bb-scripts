/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];

  ns.tprint(`Running scan from ${server}`)

   if (server){
    const connections = ns.scan(server);

    for (let connection of connections){
      ns.tprint(`Discovered ${connection} from ${server}`)

      if (ns.hasRootAccess(server)){
        ns.exec("scripts/thief_runner.js", connection, 1, connection);

        await ns.sleep(3000);

        ns.exec("scripts/thief.js", connection, 1, connection);
      }
    }
   }

   else {
    ns.tprint("Server DNE");
    return
   }
}