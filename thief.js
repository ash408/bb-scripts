export async function main(ns) {
  const server = ns.getHostname();
  ns.tprint(`Starting on ${server}`);
  await ns.sleep(1000);

  while(true) {
		await ns.hack(server);
    await ns.sleep(1000);
  }
}