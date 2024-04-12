
export async function main(ns) {
  var debug = 0;
  var scriptName = ns.getScriptName();
  var target = ns.args[0];
  var host = ns.getHostname();
  var hackTime = ns.getHackTime(target)
  var growTime = ns.getGrowTime(target)
  var weakenTime = ns.getWeakenTime(target)
  var serverSecurityLevel = ns.getServerSecurityLevel(target)
  var serverMinSecurityLevel = ns.getServerMinSecurityLevel(target)
  var serverMoneyAvailable = ns.getServerMoneyAvailable(target)
  var serverMaxMoney = ns.getServerMaxMoney(target)
  if (debug == 1){
    ns.tail(scriptName, host, ns.args[0]);
  }
  ns.print("=================================================");
  ns.print("Running script: " + scriptName);
  ns.print("On host: " + host);
  ns.print("Target = " + target);
  ns.print("=================================================");
  ns.print("Security level = " + serverSecurityLevel);
  ns.print("Minimal Security level = " + serverMinSecurityLevel);
  ns.print("=================================================");
  ns.print("Money available = " + serverMoneyAvailable);
  ns.print("Maxmimum Money on server = " + serverMaxMoney);
  ns.print("=================================================");
  ns.print("Hack time = " + Math.ceil(hackTime / 1000.0) + "s");
  ns.print("Grow time = " + Math.ceil(growTime / 1000.0) + "s");
  ns.print("Weaken time = " + Math.ceil(weakenTime / 1000.0) + "s");
  ns.print("=================================================");
  while(true) {
    if (ns.getServerSecurityLevel(target) > (serverMinSecurityLevel + 5)) {
      ns.print("=================================================");
      ns.print("Security is over " + (serverMinSecurityLevel + 5));
      ns.print("Weakening " + target);
      ns.print("=================================================");
      await ns.weaken(target);
    }
    else if (ns.getServerMoneyAvailable(target) < (serverMaxMoney * 0.5)) {
      ns.print("=================================================");
      ns.print( target + " money availabe is " + serverMoneyAvailable);
      ns.print("Growing " + target + " to atleast " + (serverMaxMoney * 0.5));
      ns.print("=================================================");
      await ns.grow(target);
    }
    else{
      ns.print("=================================================");
      ns.print("Hacking " + target);
      ns.print("=================================================");
      await ns.hack(target)
    }
  }
}
