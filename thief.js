export async function main(ns) {
	while(true) {
    const server = ns.args[0];

    if (server && ns.serverExists(server)){
		  await ns.hack(server);
    }

    else {
      ns.tprint("Server DNE");
      await ns.sleep(1000);
      return
    }
	}
}