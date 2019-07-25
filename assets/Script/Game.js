let Player = require("Player");
let MoveBg = require("BgMove");

cc.Class({
    extends: cc.Component,

    properties: {
        img_player: {     // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
            default: null,
            type: cc.Sprite
        },
        img_bg1: {        // 用于背景移动
            default: null,
            type: cc.Sprite
        },
        img_bg2: {        // 用于背景移动
            default: null,
            type: cc.Sprite
        },
        label_score: {    // 得分label
            default: null,
            type: cc.Label
        },
        score: 0
    },

    onLoad() {
        // 触摸监听
        this.setEventControl();
        // 初始化计分
        this.score = 0;
        // 判断角色是否在移动
        this.isMoving = true;
    },

    // 事件监听
    setEventControl() {
        // 获取角色绑定控件
        let player = this.img_player.getComponent(Player);
        let bg1 = this.img_bg1.getComponent(MoveBg);
        let bg2 = this.img_bg2.getComponent(MoveBg);

        this.node.on("touchstart", (event) => {
            let target = event.getCurrentTarget();
            // 获取事件所绑定的 target
            let locationInNode = target.convertToNodeSpace(event.getLocation());
            cc.log("当前点击坐标" + locationInNode);
            player.node.runAction(player.setJumpUpAction());//精灵移动
            cc.log("跳跃：－－－－－－－－");
            return true;
        }, this);

        this.node.on("touchend", (event) => {
            console.log("this.img_player.node.y==>" + this.img_player.node.y);
            if (this.img_player.node.y > 0) {
                let height = this.img_player.node.y;//背景需要移动的高度
                this.img_player.node.y = height / 2;//设置精灵的高度位置
                bg1.node.runAction(bg1.setMoveAction(height));//背景实现向下滚动
                bg2.node.runAction(bg2.setMoveAction(height));//背景实现向下滚动
                cc.log("跳跃end==>");
            }
        }, this);
    },
// 如果背景的坐标移除屏幕开始设置新的坐标
    setBgMoveUpdate() {
        // 如果背景1的坐标移除屏幕开始设置新的坐标
        if (this.img_bg1.node.y < 0) {
            this.img_bg2.node.y = this.img_bg1.node.y + this.img_bg1.node.getContentSize().height;
        }
        // 如果背景2的坐标移除屏幕开始设置新的坐标\
        if (this.img_bg2.node.y < 0) {
            this.img_bg1.node.y = this.img_bg2.node.y + this.img_bg2.node.getContentSize().height;
        }
    },

    update(dt) {
        // 检测背景
        this.setBgMoveUpdate();
        // 游戏结束判断 玩家坠落到屏幕底部游戏结束
        if (this.img_player.node.y <= -cc.view.getVisibleSize().height / 2) {
            // 角色停止移动
            if (this.isMoving){
                console.log("游戏结束==>");
                this.gameOver();
                this.isMoving = false;
            }

        }
    },

    gameOver() {
        // 移除所有监听
        this.node.targetOff(this);
        this.img_player.node.stopAllActions(); //停止 player 节点的跳跃动作
    }

});
