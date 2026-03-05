/** @param {NS} ns */

var nodeCost = 0
var nodeAmount = 0
var nodeCoreCost = 0
var nodeLevelCost = 0
var nodeRamCost = 0
var funds = 0
var debug = 2

function getVars(ns, nodeNumber) {
  nodeCost = ns.hacknet.getPurchaseNodeCost()
  nodeAmount = ns.hacknet.numNodes()
  let player = ns.getPlayer()
  funds = player.money
  if (nodeNumber !== undefined) {
    nodeLevelCost = ns.hacknet.getLevelUpgradeCost(nodeNumber, 1)
    nodeRamCost = ns.hacknet.getRamUpgradeCost(nodeNumber, 1)
    nodeCoreCost = ns.hacknet.getCoreUpgradeCost(nodeNumber, 1)
  }
}

export async function main(ns) {
  getVars(ns)
  ns.tail()
  while (true) {
    for (let i = 0; i < nodeAmount; i++) {
      getVars(ns, i)
      if (debug == 1) {
        ns.print(nodeAmount + " HackNet nodes found.")
        ns.print("Info for Node: " + (i))
        ns.print("Level Cost: " + nodeLevelCost)
        ns.print("Ram Cost: " + nodeRamCost)
        ns.print("Core Cost: " + nodeCoreCost)
      }
      let cheapest = Math.min(nodeLevelCost, nodeRamCost, nodeCoreCost)
      if (cheapest === nodeLevelCost && funds >= nodeLevelCost) {
        await ns.hacknet.upgradeLevel(i)
        if (debug == 1 || debug == 2) {
          ns.print("Upgrading Level on node: " + i)
        }
      } else if (cheapest === nodeRamCost && funds >= nodeRamCost) {
        await ns.hacknet.upgradeRam(i)
        if (debug == 1 || debug == 2) {
          ns.print("Upgrading Ram on node: " + i)
        }
      } else if (cheapest === nodeCoreCost && funds >= nodeCoreCost) {
        await ns.hacknet.upgradeCore(i)
        if (debug == 1 || debug == 2) {
          ns.print("Upgrading Core on node: " + i)
        }
      }
    }
    await ns.sleep(250)
    ns.print("=====================================")
  }
}