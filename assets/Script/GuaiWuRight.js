let Player = require("Player");  // 引用玩家的操作脚本
let Game  = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        times: 0 // 控制时间
    },

    onLoad () {
        this.moveRight();
    },

    moveRight() {
        let seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(this.times, cc.v2(-375, 0)),
                cc.moveBy(this.times, cc.v2(375, 0))
            ));
        this.node.runAction(seq);
    },
    // 当前节点世界坐标系下的范围包围盒
    nodeBox() {
        return this.node.getBoundingBoxToWorld();
    },

    update(dt) {
        let player = cc.find("Canvas/img_player").getComponent(Player);
        let game = cc.find("Canvas").getComponent(Game);
        // 障碍物碰撞框
        if(player.node.getBoundingBoxToWorld().intersects(this.nodeBox())) {
            // 移除所有Game监听事件
            game.node.targetOff(game);
            console.log("GuaiWuRight.js==>");
        }
    }
});
