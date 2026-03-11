
export type squareFunction = (x:number, y:number) => void;

export class BoardSquare {
  readonly x!:number; 
  readonly y!:number;
  readonly ClickFunction!:Function; 

  readonly IsMine:boolean = false; //ismine
  IsClicked:boolean = false; 
  Display:string = "";

  constructor(x:number, y:number, m:boolean, cf:squareFunction) {
    this.x = x; 
    this.y = y;
    this.IsMine = m; 
    this.ClickFunction = cf; 
  }
}