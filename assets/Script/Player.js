
cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpTimes: 0,
        // 掉落速度
        maxMoveSpeed: 0
    },

    onLoad () {
        this.setJumpRunAction();

    },

    // 跳跃
    setJumpUpAction() {
        // 跳跃上升
        let jumpUp = cc.moveBy(this.jumpTimes, cc.v2(0, this.jumpHeight));
        return jumpUp;
    },
    // 掉落
    setJumpDownAction() {
        let jumpDown = cc.moveBy(this.jumpTimes, cc.v2(0, -this.maxMoveSpeed));
        return jumpDown;
    },
    //
    setJumpRunAction() {
        // 初始化跳跃动作
        this.jumpUpAction = this.setJumpUpAction();
        // 掉落动作
        this.jumpDownAction = this.setJumpDownAction();
        // 包装动作
        let seq = cc.sequence(this.jumpUpAction, this.jumpDownAction);
        this.node.runAction(seq);
    },
    // 玩家不操作时，角色进行下坠
    playerDownMove() {
        // 下落
        let down = cc.moveBy(0.8, cc.v2(0, -5));
        return down;
    },

    update (dt) {
        this.node.runAction(this.playerDownMove()); // 精灵移动
    },

});
