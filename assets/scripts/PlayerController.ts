import { _decorator, Component, EventMouse, Input, input, Animation, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export const BLOCK_SIZE = 40;
@ccclass('PlayerController')
export class hello extends Component {
    @property(Animation)
    BodyAni: Animation = null


    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.1;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = new Vec3();
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3();



    start() {
        console.info('start ~~')
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
    }
    onMouseUp(event: EventMouse) {
        console.info(event.getButton())
        if (event.getButton() == 0) {
            // this.jumpByStep(1)
            this.BodyAni.play('oneStep')
        } else if (event.getButton() == 2) {
            // this.jumpByStep(2)
            this.BodyAni.play('towStep')
        }

    }
    jumpByStep(step: number) {
        if (this._startJump) { return }
        this._startJump = true
        this._jumpStep = step
        this._curJumpTime = 0
        this._curJumpSpeed = this._jumpStep * BLOCK_SIZE / this._jumpTime
        this.node.getPosition(this._curPos)
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep * BLOCK_SIZE, 0, 0))
    }

    update(deltaTime: number) {
        if (this._startJump) {
            this._curJumpTime += deltaTime
            if (this._curJumpTime > this._jumpTime) {
                this.node.setPosition(this._targetPos)
                this._startJump = false
            } else {
                // this.node.getPosition(this._curPos)
                // this._deltaPos.x = this._curJumpSpeed * deltaTime
                // Vec3.add(this._curPos, this._curPos, this._deltaPos)
                // this.node.setPosition(this._curPos)

                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime; //每一帧根据速度和时间计算位移
                Vec3.add(this._curPos, this._curPos, this._deltaPos); // 应用这个位移
                this.node.setPosition(this._curPos); // 将位移设置给角色

            }

        }

    }
}

