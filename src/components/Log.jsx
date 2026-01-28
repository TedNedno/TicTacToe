
function Log({turns}){
    
    return <>
    <ul id="log">
        {
            turns.map(turn => 
            {
            const {square,player} = turn
            const {row,col}=square

            
            return (<li key={`${row},${col}`}>{player} selected square [{row},{col}]</li>)
            }
        )
        }
    </ul>
    </>

    
}
export default Log