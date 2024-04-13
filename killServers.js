export async function main(ns) {
  const amountOfServers = 20;
  ns.tail("killServers.js", "home");

  for(let i = 1; i <= amountOfServers; i++){
    var serverName = "Delta-Group-" + i;
    ns.print("Killing: " + serverName);
    ns.killall(serverName)
  }
}