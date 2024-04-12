
export async function main(ns) {
  var debug = 1;
  var scriptName = ns.getScriptName();
  var target = ns.args[0];
  var host = ns.getHostname();
  var ports = ns.getServerNumPortsRequired(target);
  var serverMemory = ns.getServerMaxRam(target);
  var scriptMemory = ns.getScriptRam("payload.js");
  var hackingLevel = ns.getHackingLevel();
  var hackSkill = ns.getServerRequiredHackingLevel(target);
  if (debug == 1){
    ns.tail(scriptName, host, ns.args[0]);
  }
  const serverObject = ns.getServer(target);
  const portsRemaining = serverObject.numOpenPortsRequired - serverObject.openPortCount;
  if (portsRemaining >= 0) {
    ns.print("=================================================");
    ns.print("Unopened ports found, Attempting to open now.");
    switch (ports) {
        case 5: if (ns.fileExists("SQLInject.exe")) { 
          ns.print("=================================================");
          ns.print("Running SQLInject");
          ns.sqlinject(target); 
          ns.print("=================================================");
          }
        case 4: if (ns.fileExists("HTTPWorm.exe")) { 
          ns.print("=================================================");
          ns.print("Running HTTPWorm");
          ns.httpworm(target); 
          ns.print("=================================================");
          }
        case 3: if (ns.fileExists("relaySMTP.exe")) { 
          ns.print("=================================================");
          ns.print("Running RelaySMTP");
          ns.relaysmtp(target);
          ns.print("=================================================");
          }
        case 2: if (ns.fileExists("FTPCrack.exe")) { 
          ns.print("=================================================");
          ns.print("Running FTPCrack");
          ns.ftpcrack(target); 
          ns.print("=================================================");
          }
        case 1: if (ns.fileExists("BruteSSH.exe")) { 
          ns.print("=================================================");
          ns.print("Running BruteSSH");
          ns.brutessh(target); 
          ns.print("=================================================");
          }
        case 0: try {
          ns.print("=================================================");
          ns.print("Attempting to gain Root access")
          ns.nuke(target);
          ns.print("=================================================");
        }
          catch (error) {
            ns.print(error);
          }
          break;
      }
  }
  ns.print("=================================================");
  ns.print("Connected with Root access");
  ns.print("=================================================");
  ns.print("Killing any running payload instances");
  ns.kill("payload.js", target, target);
  ns.print("=================================================");
  ns.print("Moving hacking script to taget");
  ns.scp("payload.js", target, host);

  var threads = Math.floor(serverMemory / scriptMemory);
  if (hackingLevel > hackSkill && threads > 0) {
    try {
      ns.exec("payload.js", target, threads, target);
    }
    catch (error) {
      ns.print(error);
    }
  }
}