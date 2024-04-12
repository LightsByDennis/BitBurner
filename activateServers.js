/** @param {NS} ns */
export async function main(ns) {
  var target = "foodnstuff";
  const amountOfServers = 2;
  ns.tail("activateServers.js", "home");

  for(let i = 1; i <= amountOfServers; i++){
    var serverName = "Delta-Group-" + i;
    ns.print("servername = " + serverName);
    ns.scp("payload.js", serverName, "home");
    var serverMemory = ns.getServerMaxRam(serverName);
    var scriptMemory = ns.getScriptRam("payload.js");
    var threads = Math.floor(serverMemory / scriptMemory);
    ns.exec("payload.js", serverName, threads, target);
  }
}