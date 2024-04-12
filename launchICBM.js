/** @param {NS} ns */
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
    ns.tail("launchICBM.js", "home");
    let servers = dpList(ns);
    for (let server of servers)
    {
      let currentTarget = server
      if (currentTarget != "home") {
        ns.print("==========================================");
        ns.print("server = " + server);
        ns.exec("main.js", "home", 1, server);
        await ns.sleep(500)
      }
    }
    return 0;
}