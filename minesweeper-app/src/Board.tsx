import Square from './square';
import { BoardSquare } from './assets/model/BoardSquare';

export default function Board({x,y,boardData}:{x:number, y:number, boardData:BoardSquare[]}) {

          let fullBoard = []; 
          for(let i = 0; i < y; i++)
          {
            let result = [];
            for(let j = 0; j < x; j++)
            {
              result[j] = <Square data={boardData[i*x + j]} key={i * x + j}/>
            }
            
            fullBoard[i] = <div className="boardRow" key={'r'+ i}>{result}</div>
          }
          return (
            <>
              {fullBoard}
            </>
          ); 
    
}

