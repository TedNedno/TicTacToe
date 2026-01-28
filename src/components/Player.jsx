//Player.jsx

import {useState} from 'react'
function Player({ name, symbol, isActive,onChangeName}) {
    const [isEditing,setIsEditing] = useState(false)
    const [playerName,setPlayerName] = useState(name)

    const handleEditClick = () =>{
        setIsEditing(prev => !prev)

        if(isEditing){
        onChangeName(symbol,playerName)
        }
    }
    return <li className={isActive?"active":undefined}>
        <span className="player">
            <span className={isEditing?null:"player-name"}>
                {isEditing?
                <input type="text" value={playerName} onChange={(e)=>setPlayerName(e.target.value)} />:
                playerName
        }</span>
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={()=>handleEditClick()}>{isEditing?"Save":"Edit"}</button>
    </li>
}
export default Player