import { BoardSquare, type squareFunction } from "./assets/model/BoardSquare"

export default function Square({data, isGameOver, sqFunction, flagFunction}:{data:BoardSquare, isGameOver:boolean, sqFunction:squareFunction, flagFunction:squareFunction}) {

    let squareClass ='square' + ((data.IsClicked)? ' square-clicked':' square-unclicked');
    let squareContentClass =  (data.IsClicked && data.IsMine)? 'square-mine': 'square-content';
    return <div className={squareClass} 
            onClick={(e) => {
                        e.preventDefault();
                        sqFunction(data.x,data.y)}
                    } 
            onContextMenu={(e) => {
                            e.preventDefault(); 
                            flagFunction(data.x,data.y);
                            }
                        } >
                <div className={squareContentClass}>{data.GetDisplay(isGameOver)}</div>
            </div>
}