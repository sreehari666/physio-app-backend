import './listBox.css'
export const ListBox=()=>{
    const DATA = ["Dog dbjhfj dbsgjhdgj bdjhdjghhfgjdh", "Bird", "Cat", "Mouse", "Horse","Cat", "Mouse", "Horse"];
    return(
        <div className="main-container">
            <ul className='list-ul'>
                    {DATA.map(item => (
                        <div className='itemContainer'>
                            <li className='item'>
                                <p className='item-text'>{item}</p>
                                    
                                    <button className='list-btn'>edit</button>
                                    <button className='list-btn'>delete</button>
                                    
                            </li>
                        </div>
                        
                    ))}

            </ul>
            
        </div>
    )
}