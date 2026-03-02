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
    ns.tail();
    let servers = dpList(ns);
    for (let server of servers)
    {
      ns.killall(server)
    }
    return 0;
}