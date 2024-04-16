export async function main(ns) {
  const amountOfServers = 20;
  ns.tail("activateServers.js", "home");

  for(let i = 1; i <= amountOfServers; i++){
    var serverName = "Delta-Group-" + i;
    ns.print("servername = " + serverName);
    switch  (i) {
      case 1:
        var target = "n00dles";
        break;
      case 2:
        var target = "foodnstuff";
        break;
      case 3:
        var target = "sigma-cosmetics";
        break;
      case 4:
        var target = "zer0";
        break;
      case 5:
        var target = "phantasy";
        break;
      case 6:
        var target = "omega-net";
        break;
      case 7:
        var target = "silver-helix";
        break;
      case 8:
        var target = "crush-fitness";
        break;
      default:
        var target = "crush-fitness";
        break;
    }
    ns.killall(serverName)
    ns.scp("payload.js", serverName, "home");
    var serverMemory = ns.getServerMaxRam(serverName);
    var scriptMemory = ns.getScriptRam("payload.js");
    var threads = Math.floor(serverMemory / scriptMemory);
    ns.exec("payload.js", serverName, threads, target);
  }
}