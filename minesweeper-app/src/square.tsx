import { BoardSquare, type squareFunction } from "./assets/model/BoardSquare"

export default function Square({data, isGameOver, sqFunction}:{data:BoardSquare, isGameOver:boolean, sqFunction:squareFunction}) {

    let squareClass ='square' + ((data.IsClicked)? ' square-clicked':' square-unclicked');
    let squareContentClass =  (data.IsClicked && data.IsMine)? 'square-mine': 'square-content';
    return <div className={squareClass} onClick={(e) => {
        e.preventDefault();
        console.log("click!")
        sqFunction(data.x,data.y)}} >
                <div className={squareContentClass}>{data.GetDisplay(isGameOver)}</div>
            </div>
}