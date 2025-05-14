const { GroupManager, RobloxCloud } = require("./index.cjs")

const groupManager = new GroupManager(new RobloxCloud(require("./key.json").key), "34746991")
console.log("BirdgZGorup Zhan Ran!", new Date())