import Board from './Board'
//import Square from './square';
import { useState } from 'react'
import { BoardSquare } from './assets/model/BoardSquare';


export default function GameManager() {
    let [maxX, setMaxX] = useState(10);
    let [maxY, setMaxY] = useState(10); 
    let [boardGame,setBoardGame] = useState<BoardSquare[]>(InstantiateBoardGame());
    let [lastUpdateDate, setLastUpdateDate] = useState<Date>(new Date());

    
    function InstantiateBoardGame() 
    {
      console.log("calling");
      let ts:BoardSquare[] = [];
      let ms:boolean[] = Array(maxX * maxY).fill(false);
      let deployedMineCount:number = 0; 

      while(deployedMineCount <30)
      {
        let a: number = Math.floor(Math.min(Math.random() * 100,99));
        if(!ms[a]) 
          {
            deployedMineCount++; 
            ms[a] = true; 
            console.log(a + "is mine");
          } 
      }
      
      for(let i = 0; i < maxY; i++ )
      {
        for(let j =0; j< maxX; j++)
        {
            ts[i*maxX + j] = new BoardSquare(j,i, ms[i*maxX + j], OnClickSquare);
        }
      }

      console.log(new Date() + "; board square count: " + ts.length);
      // for(let i =0; i < ts.length; i++)
      // {console.log(ts[i].x + " " + ts[i].y + " " + ts[i].IsMine);}
      return ts;
    };

    function OnClickSquare(x:number, y:number)
    {
      console.log("boardGame onclicksquare" + {boardGame} + " " + boardGame.length);
      ProcessClick(x,y);
      setLastUpdateDate(new Date());
    }

    function ProcessClick(x:number, y:number)
    {
      console.log("boardGame" + {boardGame});
      let flatIndex:number = maxX * y + x; 
      console.log(x + " " + y + " " + boardGame.length + " " + maxX);
      console.log(boardGame[flatIndex]);
      if(!boardGame[flatIndex].IsClicked)
      {
        boardGame[flatIndex].IsClicked = true; 

        let mineNumber:number = 0; 
        if(x > 0 )
        {
          if(boardGame[y * maxX + x-1].IsMine) 
            {
              mineNumber++;
            } 
            else if(!boardGame[y * maxX + x-1].IsClicked) 
            {
              ProcessClick(x-1,y);
            }
        } 

        if(y > 0 )
        {
          if(boardGame[(y-1) * maxX + x].IsMine) 
          {
            mineNumber++;
          } 
          else if(!boardGame[(y-1) * maxX + x].IsClicked) 
          {
            ProcessClick(x,y-1);
          }          
        } 

        if(x > 0 && y > 0) 
        {
          if(boardGame[(y - 1) * maxX + x-1].IsMine) 
          {
              mineNumber++;
          }
          else if(!boardGame[(y - 1) * maxX + x-1].IsClicked)
          {
            ProcessClick(x -1 , y -1);
          } 
        }

        if(x + 1 < maxX) 
        {
          if(boardGame[y * maxX + x + 1].IsMine) 
          {
            mineNumber++;
          } 
          else if(!boardGame[y * maxX + x + 1].IsClicked) 
          {
            ProcessClick(x + 1, y);
          }
        }

        if(y + 1 < maxY)
          {
            if(boardGame[(y + 1) * maxX + x].IsMine) 
            {
              mineNumber++;
            }
            else if(!boardGame[(y + 1) * maxX + x].IsClicked) 
            {
              ProcessClick(x, y + 1);
            }            
          } 

        if(x + 1 < maxX && y+1 < maxY) 
          {
            if(boardGame[(y+1) * maxX + x + 1].IsMine)
            {
                mineNumber++;
            }
            // }else if(!boardGame[(y+1) * maxX + x + 1].IsClicked)
            // {
            //   ProcessClick(x + 1, y +1);
            // } 
          }

        if(y > 0 && x + 1 < maxX ) 
          {
            if(boardGame[(y - 1) * maxX + x + 1].IsMine)
            {
              mineNumber++; 
            } 
            // else if(!boardGame[(y - 1) * maxX + x + 1].IsClicked)
            // {
            //   ProcessClick(x + 1, y - 1);
            // } 
            
          }

        if(y + 1 < maxY && x > 0) 
          {
            if(boardGame[(y + 1) * maxX + x - 1].IsMine)
            {
              mineNumber++;
            }
            // else if(!boardGame[(y + 1) * maxX + x - 1].IsClicked)
            // {
            //   ProcessClick(x - 1, y + 1);
            // } 
          }

          boardGame[flatIndex].Display = (mineNumber === 0)?"":mineNumber.toString(); 
      }

    }

     console.log("boardgame lalala " + boardGame.length);
    return <>
    <div>
      <Board x={maxX} y={maxY} boardData={boardGame}/>
    </div>
    </>
}
