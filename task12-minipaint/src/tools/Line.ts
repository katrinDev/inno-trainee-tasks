import Tool from "./Tool";

export default class Line extends Tool {
  private isMouseDown: boolean;
  private saved: string;
  private startX: number;
  private startY: number;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.isMouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.saved = "";
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

    [this.startX, this.startY] = this.calculatePosition(e.clientX, e.clientY);

    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.isMouseDown) {
      const [currentX, currentY] = this.calculatePosition(e.clientX, e.clientY);

      this.draw(currentX, currentY);
    }
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();

      this.ctx.moveTo(this.startX, this.startY);

      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
