import Tool from "./Tool";

export default class Circle extends Tool {
  private isMouseDown: boolean;
  private startX: number;
  private startY: number;
  private saved: string;

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

    this.ctx.beginPath;

    [this.startX, this.startY] = this.calculatePosition(e.clientX, e.clientY);
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.isMouseDown) {
      const [currentX, currentY] = this.calculatePosition(e.clientX, e.clientY);
      const centerX = (this.startX + currentX) / 2;
      const centerY = (this.startY + currentY) / 2;
      const radius = Math.abs((currentX - this.startX) / 2);

      this.draw(centerX, centerY, radius);
    }
  }

  draw(centerX: number, centerY: number, radius: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();

      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
