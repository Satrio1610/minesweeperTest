
export type squareFunction = (x:number, y:number) => void;

export class BoardSquare {
  readonly x!:number; 
  readonly y!:number;
  readonly ClickFunction!:Function; 

  readonly IsMine:boolean = false; //ismine
  IsClicked:boolean = false; 
  IsFlagged:boolean = false; 
  Display:string = "";

  constructor(x:number, y:number, m:boolean) {
    this.x = x; 
    this.y = y;
    this.IsMine = m; 
    //this.ClickFunction = cf; 
  }

  GetDisplay(showAll:boolean)
    {
      if(this.IsFlagged) return "O";
      if(this.IsClicked || showAll)
      {
        if(this.IsMine) return "X";
        return this.Display; 
      }
    }
}