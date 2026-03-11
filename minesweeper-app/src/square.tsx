import { BoardSquare } from "./assets/model/BoardSquare"

export default function Square({data}:{data:BoardSquare}) {

    let squareClass ='square' + ((data.IsClicked)? ' square-clicked':' square-unclicked');
    return <div className={squareClass} onClick={(e) => {
        e.preventDefault();
        console.log("click!")
        data.ClickFunction(data.x,data.y)}} >
                <div className='square-content'>{(data.IsMine)? "mine":(data.IsClicked?data.Display:"")}</div>
            </div>
}