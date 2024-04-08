import { AfterViewInit, Component } from '@angular/core';

interface CursorCoordinates {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
}

interface CanvasPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

@Component({
  selector: 'it-drawing-board',
  templateUrl: './it-drawing-board.component.html'
})
export class ItDrawingBoardComponent implements AfterViewInit {
  canvas: HTMLCanvasElement = null as any;
  /** When canvas size can not be set, this number defines how oft it should be tried again before throwing an error */
  maxCallCount = 3;
  painting: boolean = false;
  cursorCoordinates: CursorCoordinates = {
    x: null as any,
    y: null as any,
    prevX: null as any,
    prevY: null as any,
  };
  /** Canvas position and dimension have to be transformed to css pixel (form canvas pixel). Afterwards the values are saved here */
  canvasPosition: CanvasPosition = null as any;

  /** When the user stops drawing, the whole painting is saved in this array so when he wants to revert his changes, we can use these urls */
  drawingUrls: string[] = [];
  /** Index that is used to identify, which drawing is currently showing when cycling through url's with back and forward. -1 means that, no url is currently looked at */
  urlIndex: number = -1;
  
  lineWidth = 8;
  lineWidths = [8, 16, 24];

  black: string = "#000000";
  white: string = "#FFFFFF";
  color: string = this.black;
  colors: string[][] = [
    [
      this.black,
      "#844204",
      "#FF2929",
      "#FF7B06",
      "#FFE10A",
      "#37FFDB",
      "#4DBFFF",
      "#0070FF",
      "#952BFF",
      "#3EE500"
    ],
    [
      this.white,
      "#633000",
      "#DA2323",
      "#E67007",
      "#EED100",
      "#0FCCAA",
      "#2C94CF",
      "#0260D8",
      "#6005BB",
      "#3ACA05"
    ]
  ];

  get context() {
    return this.canvas.getContext("2d")!;
  }
  
  /**
   * Returns the amount of buttons a row contains
   * @date 4/1/2024 - 3:13:39 PM
   *
   * @readonly
   * @type {number}
   */
  get controlButtonCount() {
    return 0;
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement> document.querySelector('#canvas');
    if (!!!this.canvas || this.context === null) {
      console.error("Canvas not found");
      return;
    }

    setTimeout(() => {
      addEventListener("resize", () => {
        this.onResize(2);
      });
      this.onResize();
    });

    this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
    window.addEventListener("mouseup", this.endDrawing.bind(this));
    this.canvas.addEventListener("mouseleave", this.resetCursorCoordinates.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));

    this.canvas.addEventListener("touchstart", this.startDrawing.bind(this));
    window.addEventListener("touchend", this.endDrawing.bind(this));
    window.addEventListener("touchcancel", this.endDrawing.bind(this));
    this.canvas.addEventListener("touchmove", this.draw.bind(this));
  }

  /**
   * Wrapper for everything that need's to be done on resize
   * @param callCount callCount passed on to setCanvasSize to control how often the method is called on fail
   */
    onResize(callCount?: number) {
    this.setCanvasSize(callCount).then(() => {
      this.canvasPosition = this.getCanvasSizeInCSSPixels();
    
      this.clearCanvas();
    }).catch(() => {
      console.error ("Could not set size of canvas. Please try to refresh the application");
    });
  }

  /**
   * Get's and sets the size of the canvas by using an measurement div
   * @param callCount Number of times the method called itself
   * @returns Promise that is resolved when the function has completed "calling itself" 
   */
  setCanvasSize(callCount: number = 1) : Promise<any> {
    const widthMeasurement = document.getElementById("width-measurement");
    if (widthMeasurement === null || widthMeasurement.offsetWidth === 0) {
      // If measurement element was not found try again, if maxCallCount was not exceeded
      console.warn("Trying to get width-measurement again. Call count: ", callCount);
      if (this.maxCallCount > callCount) {
        return new Promise((resolve) => setTimeout(() => {
          resolve(this.setCanvasSize(callCount + 1));
        }, (callCount + 1) * 5));
      } else {
        console.error(
          widthMeasurement === null ?
          "Could not get width-measurement element" :
          "Width-measurement element width was 0"
        );
        return Promise.reject();
      }
    }
    
    // Aspect Ratio 24 : 13 (Calculated width figma design)
    this.context.canvas.width = widthMeasurement.offsetWidth;
    this.context.canvas.height = (widthMeasurement.offsetWidth / 24) * 13;
    return Promise.resolve();
  }

  /**
   * Calculates the position and dimension of the canvas in css pixels
   * @returns CanvasPosition
   */
  getCanvasSizeInCSSPixels() : CanvasPosition {
    var top, left, right, bottom;
    const bounds = this.canvas.getBoundingClientRect();
    const canStyle = getComputedStyle(this.canvas);
    
    left  = this.convertPxToNum(canStyle.paddingLeft);
    left += this.convertPxToNum(canStyle.borderLeftWidth);
    
    top  = this.convertPxToNum(canStyle.paddingTop);
    top += this.convertPxToNum(canStyle.borderTopWidth);
    
    right  = this.convertPxToNum(canStyle.paddingRight);
    right += this.convertPxToNum(canStyle.borderRightWidth);
    
    bottom  = this.convertPxToNum(canStyle.paddingBottom);
    bottom += this.convertPxToNum(canStyle.borderBottomWidth);       
    
    return {
        top: bounds.top + top  + scrollY,
        bottom: bounds.bottom + bottom + scrollY,
        left: bounds.left + left  + scrollX,
        right: bounds.right + right + scrollX,
        width: bounds.width - left - right,
        height: bounds.height - top - bottom,
    };
  }

  convertPxToNum(px: string) {
    return Number(px.replace("px",""));
  }

  startDrawing(event: Event) {
    this.painting = true;
    this.draw(event);
  }

  endDrawing() {
    this.painting = false;
    // Reset cursor coordinates so touch lines do not connect to each other
    this.resetCursorCoordinates();
    this.addDrawingUrl();
  }

  resetCursorCoordinates() {
    this.cursorCoordinates = {
      x: null as any,
      y: null as any,
      prevX: null as any,
      prevY: null as any,
    };
  }

  draw(event: any) {
    let xPosition = 0;
    let yPosition = 0;

    if(event.type.includes(`touch`)) {
      const { touches, changedTouches } = event.originalEvent ?? event;
      const touch = touches[0] ?? changedTouches[0];
      xPosition = touch.pageX;
      yPosition = touch.pageY;
    } else {
      xPosition = event.pageX;
      yPosition = event.pageY;
    }

    this.cursorCoordinates.prevX = this.cursorCoordinates.x !== null ? this.cursorCoordinates.x : xPosition;
    this.cursorCoordinates.prevY = this.cursorCoordinates.y !== null ? this.cursorCoordinates.y : yPosition;
    this.cursorCoordinates.x = xPosition;
    this.cursorCoordinates.y = yPosition;
    if (!this.painting) return;

    this.context.lineCap = "round";
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;

    // Calculate scaled coordinates so line starts to draw directly below the cursor
    const xScale = this.canvas.width / this.canvasPosition.width;
    const yScale = this.canvas.height / this.canvasPosition.height;
    
    const x = (this.cursorCoordinates.x - this.canvasPosition.left) * xScale;
    const y = (this.cursorCoordinates.y - this.canvasPosition.top) * yScale;
    const px = (this.cursorCoordinates.prevX - this.canvasPosition.left) * xScale;
    const py = (this.cursorCoordinates.prevY - this.canvasPosition.top) * yScale;

    this.context.beginPath();
    this.context.lineTo(px, py);
    this.context.lineTo(x, y);
    this.context.stroke();
  }

  clearCanvas() {
    this.fillCanvas(this.white);
  }

  setColor(color: string) {
    this.color = color;
  }

  setLineWidth(width: number) {
    this.lineWidth = width;
  }

  fillCanvas(color?: string) {
    this.context.fillStyle = color ?? this.color;
    this.context.fillRect(0, 0, 10000, 10000);
  }

  addDrawingUrl() {
    const url = this.canvas.toDataURL();
    if (!!url && url !== this.drawingUrls[this.drawingUrls.length - 1]) {
      this.drawingUrls.push(url);
    }
  }

  revert() {
    this.clearCanvas();
    this.drawingUrls.pop();
    if (this.drawingUrls.length >= 1) {
      this.setCanvasImage(this.drawingUrls[this.drawingUrls.length - 1]);
    }
  }
  
  setCanvasImage(image: string) {
    let img = new Image(); 
    let canvas = this.context;
    img.onload = function(){
      canvas.drawImage(img, 0, 0);
    };
    img.src = image;
  }

}
