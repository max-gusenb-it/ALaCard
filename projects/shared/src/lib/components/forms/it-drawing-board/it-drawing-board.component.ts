import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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
  private readonly parentNodeId: string = "drawing-board-parent";
  private readonly whiteFillAction: string = "fill-#ffffff";

  @ViewChild("container", { read: ElementRef }) container?: ElementRef<HTMLDivElement>;

  @Input() drawingUrl?: string;

  @Output() drawingChanged: EventEmitter<string> = new EventEmitter();

  canvas: HTMLCanvasElement = null as any;
  /** When canvas size can not be set, this number defines how oft it should be tried again before throwing an error */
  maxCallCount = 4;
  painting: boolean = false;
  cursorCoordinates: CursorCoordinates = {
    x: null as any,
    y: null as any,
    prevX: null as any,
    prevY: null as any,
  };
  /** Canvas position and dimension have to be transformed to css pixel (form canvas pixel). Afterwards the values are saved here */
  canvasPosition: CanvasPosition = null as any;

  /** Tracks number of how often the pointer down event was called */
  pointerdownCounter: number = 0;
  prevPointerdownCounter: number = 0;

  /** When the user stops drawing, the whole painting is saved in this array so when he wants to revert his changes, we can use these urls */
  drawingUrls: { drawingUrl: string, action: string }[] = [];
  
  lineWidth = 8;
  lineWidths = [8, 16, 24];

  black: string = "#000000";
  white: string = "#ffffff";
  color: string = this.black;
  colors: string[][] = [
    [
      this.black,
      "#844204",
      "#FF2929",
      "#FF7B06",
      "#FFE10A",
      "#FBE5BA",
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
      "#FDDCB4",
      "#2C94CF",
      "#0260D8",
      "#6005BB",
      "#3ACA05"
    ]
  ];

  get context() {
    return this.canvas.getContext("2d")!;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement> document.querySelector('#canvas');
    if (!!!this.canvas || this.context === null) {
      console.error("Canvas not found");
      return;
    }

    if(this.drawingUrl) {
      this.drawingUrls.push({
        drawingUrl: this.drawingUrl,
        action: "init"
      });
    }

    setTimeout(() => {
      addEventListener("resize", () => {
        this.onResize();
      });
      this.onResize();
    });

    this.canvas.addEventListener('pointerdown', (ev) => {
      this.pointerdownCounter += 1;
      this.startDrawing(ev);
    });

    window.addEventListener("mouseup", this.endDrawing.bind(this));
    this.canvas.addEventListener("mouseleave", this.resetCursorCoordinates.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));

    window.addEventListener("touchend", this.endDrawing.bind(this));
    window.addEventListener("touchcancel", this.endDrawing.bind(this));
    this.canvas.addEventListener("touchmove", this.draw.bind(this), { passive: true });
  }

  /**
   * Wrapper for everything that need's to be done on resize
   * @param callCount callCount passed on to setCanvasSize to control how often the method is called on fail
   */
  onResize(callCount?: number) {
    return this.setCanvasSize(callCount)
      .then(() => {
        this.canvasPosition = this.getCanvasSizeInCSSPixels();
      })
      .finally(() => this.initiateCanvas())
      .catch(() => {
        console.error ("Could not set size of canvas. Please try to refresh the application");
    });
  }

  /**
   * Get's and sets the size of the canvas by using the container div
   * @param callCount Number of times the method called itself
   * @returns Promise that is resolved when the function has completed "calling itself" 
   */
  setCanvasSize(callCount: number = 1) : Promise<any> {
    if (!!!this.container || this.container.nativeElement.offsetWidth === 0) {
      // If measurement element was not found try again, if maxCallCount was not exceeded
      if (this.maxCallCount > callCount) {
        this.changeDetectorRef.detectChanges();
        return new Promise((resolve) => setTimeout(() => {
          resolve(this.setCanvasSize(callCount + 1));
        }, (callCount + 1) * 5));
      } else {
        console.error(
          this.container === null ?
          "Could not get container element" :
          "Container element width was 0"
        );
        return Promise.reject();
      }
    }
    
    // Aspect Ratio 24 : 13 (Calculated width figma design)
    this.context.canvas.width = this.container!.nativeElement.offsetWidth;
    this.context.canvas.height = (this.container!.nativeElement.offsetWidth / 24) * 13;
    return Promise.resolve();
  }

  /**
   * Calculates the position and dimension of the canvas in css pixels
   * @returns CanvasPosition
   */
  getCanvasSizeInCSSPixels() : CanvasPosition {
    var left, right, bottom;
    const bounds = this.canvas.getBoundingClientRect();
    const canStyle = getComputedStyle(this.canvas);
    
    left  = this.convertPxToNum(canStyle.paddingLeft);
    left += this.convertPxToNum(canStyle.borderLeftWidth);
    
    right  = this.convertPxToNum(canStyle.paddingRight);
    right += this.convertPxToNum(canStyle.borderRightWidth);
    
    bottom  = this.convertPxToNum(canStyle.paddingBottom);
    bottom += this.convertPxToNum(canStyle.borderBottomWidth);
    
    // check if drawing board has a parent (modal) with it's own offset
    let parentOffest = 0;
    let parentElement = document.getElementById(this.parentNodeId);
    if (!!parentElement && parentElement.children.length >= 1) {
      parentOffest = (parentElement.clientHeight - parentElement.children[0].clientHeight) / 2;
    }
    
    return {
        top: this.canvas.offsetTop + parentOffest,
        bottom: bounds.bottom + bottom + scrollY,
        left: bounds.left + left  + scrollX,
        right: bounds.right + right + scrollX,
        width: bounds.width - left - right,
        height: this.canvas.clientHeight,
    };
  }

  convertPxToNum(px: string) {
    return Number(px.replace("px",""));
  }

  initiateCanvas() {
    this.clearCanvas();
    if (this.drawingUrls.length !== 0) {
      this.setCanvasImage(this.drawingUrls[this.drawingUrls.length - 1].drawingUrl);
    }
  }

  startDrawing(event: Event) {
    this.painting = true;
    this.disableScrolling();
    this.draw(event);
  }

  disableScrolling() {
    document.body.addEventListener('touchmove', this.preventScrollingHandler, { passive: false });
  }

  endDrawing() {
    // Reset cursor coordinates so touch lines do not connect to each other
    this.resetCursorCoordinates();
    if (!this.painting) return;
    this.painting = false;
    this.enableSrolling();
    this.addDrawingUrl("draw-" + this.color);
    this.emitDrawing();
  }

  enableSrolling() {
    document.body.removeEventListener('touchmove', this.preventScrollingHandler);
  }

  preventScrollingHandler(e: TouchEvent) {
    e.preventDefault();
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

  /**
   * Add's a drawing url to the drawing url array if checks succeed
   * 
   * pointerdownCounter check ensures, that no url's are added on revert button click when using mobile. (Revert button fires touch end event)
   * @date 4/8/2024 - 2:18:00 PM
   */
  addDrawingUrl(action: string) {
    const url = this.canvas.toDataURL();
    if (url && (this.drawingUrls.length === 0 || url !== this.drawingUrls[this.drawingUrls.length - 1].drawingUrl) && this.pointerdownCounter !== this.prevPointerdownCounter) {
      this.forceAddDrawingUrl(url, action);
    }
  }

  forceAddDrawingUrl(url: string, action: string) {
    this.drawingUrls.push({
      drawingUrl: url,
      action: action
    });
    this.prevPointerdownCounter = this.pointerdownCounter;
  }
  
  /**
   * Method used to clear canvas without adding a data url
   * @date 4/15/2024 - 7:52:26 AM
   */
  clearCanvas() {
    this.context.fillStyle = this.white;
    this.context.fillRect(0, 0, 10000, 10000);
    this.drawingChanged.emit("");
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
    this.forceAddDrawingUrl(this.canvas.toDataURL(), "fill-" + this.context.fillStyle);
    if (this.context.fillStyle.toLocaleLowerCase() === this.white.toLocaleLowerCase()) this.drawingChanged.emit("");
    else this.emitDrawing();
  }

  revert() {
    this.clearCanvas();
    this.drawingUrls.pop();
    if (this.drawingUrls.length >= 1) {
      this.setCanvasImage(this.drawingUrls[this.drawingUrls.length - 1].drawingUrl);
      if (this.drawingUrls[this.drawingUrls.length - 1].action !== this.whiteFillAction) {
        this.emitDrawing();
      } else {
        this.drawingChanged.emit("");
      }
    }
  }

  emitDrawing() {
    if (this.drawingUrls.length !== 0) {
      let onlyWhite = true;
      let isFillAction = false;
      for(let i = this.drawingUrls.length - 1; i >= 0 && onlyWhite && !isFillAction; i--) {
        isFillAction = this.drawingUrls[i].action.startsWith("fill");
        onlyWhite = this.drawingUrls[i].action.indexOf(this.white) !== -1;
      }
      if (onlyWhite) {
        this.drawingChanged.emit("");
        return;
      }
    }
    this.drawingChanged.emit(this.exportImage());
  }

  waitForImageToLoad(imageElement: any){
    return new Promise(resolve => { imageElement.onload = resolve })
  }
  
  setCanvasImage(image: string) {
    let img = new Image(); 
    let canvas = this.context;
    img.src = image;
    this.waitForImageToLoad(img).then(() => {
      canvas.drawImage(img, 0, 0);
      this.emitDrawing();
    });
  }

  exportImage() {
    return this.canvas.toDataURL('image/png');
  }

  importImage(image: string) {
    this.setCanvasImage(image);
    this.emitDrawing();
  }
}
