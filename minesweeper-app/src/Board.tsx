import Square from './square';
import { BoardSquare, type squareFunction } from './assets/model/BoardSquare';

export default function Board({x,y,boardData, isGameOver, sqFunction, flagFunction}:{x:number, y:number, boardData:BoardSquare[], isGameOver:boolean, sqFunction:squareFunction, flagFunction:squareFunction}) {

          let fullBoard = []; 
          for(let i = 0; i < y; i++)
          {
            let result = [];
            for(let j = 0; j < x; j++)
            {
              result[j] = <Square data={boardData[i*x + j]} key={i * x + j} isGameOver={isGameOver} sqFunction={sqFunction} flagFunction={flagFunction}/>
            }
            
            fullBoard[i] = <div className="boardRow" key={'r'+ i}>{result}</div>
          }
          return (
            <>
              {fullBoard}
            </>
          ); 
    
}

