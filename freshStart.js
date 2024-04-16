function dpList(ns, current = "home", set = new Set()) 
{
  	let connections = ns.scan(current);
  	let next = connections.filter(c => !set.has(c));
  	next.forEach(n => 
  	{
    	set.add(n); return dpList(ns, n, set);
  	});
  	return Array.from(set.keys());
}

export async function main(ns) 
{
  	var debug = 1;
  	ns.tail("freshStart.js", "home");
  	let servers = dpList(ns);
  	for (let server of servers)
  	{
    	let currentTarget = server
    	if (currentTarget != "home") {
    		if (debug = 1) {
    			ns.tprint("==========================================");
   				ns.tprint("server = " + server);
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
        			  	ns.print("Attempting to gain Root access");
        			  	ns.nuke(target);
        			  	ns.print("=================================================");
        			}
          			catch (error) {
            			ns.print(error);
          			}
          			break;
      			}
  			}
  			ns.killall(target)
  			ns.scp("payload.js", target, "home");
    		var serverMemory = ns.getServerMaxRam(target);
    		var scriptMemory = ns.getScriptRam("payload.js");
    		var threads = Math.floor(serverMemory / scriptMemory);
    		ns.exec("payload.js", target, threads, target);
      		await ns.sleep(500);
    	}
  	}
  	return 0;
}