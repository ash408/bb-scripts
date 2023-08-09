/** @param {NS} ns */
export async function main(ns) {
  const startStop = ns.args[0].toLowerCase();

  const server = ns.getHostname();
  ns.tprint(`Running scan from ${server}`)
  await ns.sleep(1000);
  
  const connections = ns.scan(server);

  for (let connection of connections){
    ns.tprint(`Discovered ${connection} from ${server}`)
    await ns.sleep(1000);

    ns.tprint(`Connecting to ${connection}`);
    await ns.sleep(1000);

    const files = ns.ls("home", ".js");
    const connectionFiles = ns.ls(connection, ".js");

    const sameLength = files.length && connectionFiles.length;
    const sameContents = files.every(el => connectionFiles.includes(el))

    if(!sameLength && !sameContents){  
      ns.tprint(`Uploading ${files} to ${connection}`);
      await ns.scp(files, connection);
            
      ns.exec("scripts/break.js", connection, 1, connection);
      await ns.sleep(1000);
    }
  }
}