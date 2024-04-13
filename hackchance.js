/** @param {NS} ns */
export async function main(ns) {
  var target = "silver-helix"
  ns.tail("hackchance.js", "home");
  var chance = ns.hackAnalyzeChance(target)
  ns.print(chance)
}