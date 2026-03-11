import Board from './Board'
//import Square from './square';
import { useState } from 'react'
import { BoardSquare } from './assets/model/BoardSquare';

let maxX = 9;
let maxY = 9;  
let initial = InstantiateBoardGame(); 

function InstantiateBoardGame() 
    {
      console.log("calling");
      let ts:BoardSquare[] = [];
      let ms:boolean[] = Array(maxX * maxY).fill(false);
      let deployedMineCount:number = 0; 

      while(deployedMineCount <10)
      {
        let a: number = Math.floor(Math.min(Math.random() * (maxX * maxY),(maxX * maxY)));
        if(!ms[a]) 
          {
            deployedMineCount++; 
            ms[a] = true; 
          }
      }
      // ms[13] = true; 
      // ms[45] = true; 
      // ms[54] = true; 
      // ms[63] = true; 
      // ms[64] = true; 
      // ms[73] = true; 
      // ms[75] = true; 
      // ms[67] = true; 
      // ms[71] = true; 
      // ms[53] = true; 

      for(let i = 0; i < maxY; i++ )
      {
        for(let j =0; j< maxX; j++)
        {
            ts[i*maxX + j] = new BoardSquare(j,i, ms[i*maxX + j]);
        }
      }
      return ts;
    };

export default function GameManager() {
    let [maxX, setMaxX] = useState(9);
    let [maxY, setMaxY] = useState(9); 
    let [isGameOver, setIsGameOver] = useState(false)
    let [boardGame,setBoardGame] = useState<BoardSquare[]>(initial);

    function OnClickSquare(x:number, y:number)
    {
      
      if(isGameOver) return; 
      let nbg = boardGame.slice();
      console.log("boardGame onclicksquare" + {boardGame} + " " + boardGame.length);
      ProcessClick(x,y, nbg);
      setBoardGame(nbg);
    }

    function ProcessClick(x:number, y:number, bsq:BoardSquare[])
    {
      //console.log("boardGame" + {bsq});
      let flatIndex:number = maxX * y + x; 
      console.log(x + " " + y + " " + bsq.length + " " + maxX);
      console.log(bsq[flatIndex]);
      if(!bsq[flatIndex].IsClicked)
      {
        bsq[flatIndex].IsClicked = true; 

        if(!bsq[flatIndex].IsMine)
        {
          let mineNumber:number = 0; 
          let clickableNeighbours:{x:number, y:number}[] = []; 
          if(x > 0 )
          {
            if(bsq[y * maxX + x-1].IsMine) 
              {
                mineNumber++;
              } 
              else if(!bsq[y * maxX + x-1].IsClicked && mineNumber == 0) 
              {
                clickableNeighbours.push({x: x-1, y:y});
              }
          } 

          if(y > 0 )
          {
            if(bsq[(y-1) * maxX + x].IsMine) 
            {
              mineNumber++;
            } 
            else if(!bsq[(y-1) * maxX + x].IsClicked && mineNumber == 0) 
            {
              clickableNeighbours.push({x: x, y:y-1});
            }          
          } 

          if(x > 0 && y > 0) 
          {
            if(bsq[(y - 1) * maxX + x-1].IsMine) 
            {
                mineNumber++;
            }
            else if(!bsq[(y - 1) * maxX + x-1].IsClicked && mineNumber == 0)
            {
              clickableNeighbours.push({x: x-1, y:y-1});
            } 
          }

          if(x + 1 < maxX) 
          {
            if(bsq[y * maxX + x + 1].IsMine) 
            {
              mineNumber++;
            } 
            else if(!bsq[y * maxX + x + 1].IsClicked && mineNumber == 0) 
            {
              clickableNeighbours.push({x: x + 1, y:y});
            }
          }

          if(y + 1 < maxY)
            {
              if(bsq[(y + 1) * maxX + x].IsMine) 
              {
                mineNumber++;
              }
              else if(!bsq[(y + 1) * maxX + x].IsClicked && mineNumber == 0) 
              {
                clickableNeighbours.push({x: x, y:y+1});
              }            
            } 

          if(x + 1 < maxX && y+1 < maxY) 
            {
              if(bsq[(y+1) * maxX + x + 1].IsMine)
              {
                  mineNumber++;
              }else if(!bsq[(y+1) * maxX + x + 1].IsClicked)
              {
                clickableNeighbours.push({x: x + 1, y:y + 1});
              } 
            }

          if(y > 0 && x + 1 < maxX ) 
            {
              if(bsq[(y - 1) * maxX + x + 1].IsMine)
              {
                mineNumber++; 
              } 
              else if(!bsq[(y - 1) * maxX + x + 1].IsClicked)
              {
                clickableNeighbours.push({x: x + 1, y:y-1});
              } 
              
            }

          if(y + 1 < maxY && x > 0) 
            {
              if(bsq[(y + 1) * maxX + x - 1].IsMine)
              {
                mineNumber++;
              }
              else if(!bsq[(y + 1) * maxX + x - 1].IsClicked)
              {
                clickableNeighbours.push({x: x - 1, y:y + 1});
              } 
            }

            while(mineNumber == 0 && clickableNeighbours.length > 0)
            {
                let n = clickableNeighbours.pop(); 
                if(n !== undefined) ProcessClick(n.x, n.y, bsq); 
            }

            bsq[flatIndex].Display = (mineNumber === 0)?"":mineNumber.toString(); 
        }
        else 
        {
          console.log("GAME OVER");
          setIsGameOver(true); 
        }
      }

    }

    return <>
    <div>
      <div>
        <Board x={maxX} y={maxY} boardData={boardGame} isGameOver={isGameOver} sqFunction={OnClickSquare}/>
      </div>
      <div>
        <button onClick={(e) => {
          e.preventDefault();
          let a = InstantiateBoardGame();
          setBoardGame(a);
          setIsGameOver(false);
        }}>RESET</button>
      </div>
    </div>
    </>
}
