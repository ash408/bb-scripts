export async function main(ns) {
  const server = ns.args[0];

  ns.tprint(`Starting on ${server}`);

  if(server){

	  while(true) {
		  await ns.hack(server);
      await ns.sleep(1000);
    }
  }

  else {
    ns.tprint("Server DNE");
    return
  }
}