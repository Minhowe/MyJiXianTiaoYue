
cc.Class({
    extends: cc.Component,

    properties: {
        jumpTimes: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    setMoveAction(height) {
        //移动距离
        let moveAction = cc.moveBy(this.jumpTimes, cc.v2(0, - height));
        return moveAction;
    }

});
