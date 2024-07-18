import Tool from "./Tool";

export default class Brush extends Tool {
  protected isMouseDown: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.isMouseDown = false;
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.isMouseDown = false;
  }

  mouseDownHandler(e: MouseEvent) {
    this.isMouseDown = true;

    //we started to draw new line
    this.ctx.beginPath;
    const [x, y] = this.calculatePosition(e.clientX, e.clientY);
    //move to cursor to the start point
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.isMouseDown) {
      const [x, y] = this.calculatePosition(e.clientX, e.clientY);
      this.draw(x, y);
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    //sets outline
    this.ctx.stroke();
  }
}
