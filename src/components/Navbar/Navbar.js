import React from 'react'
import './Navbar.css'

const Navbar = ({
    selectLength,
    selectSpeed,
    selectAlgo,
    generateRandomArray,
    selectSort,
    sorting,
    completed,
    len,
    speed,algo
}) => {

    return (
        <nav>
            <div className='nav-head'>Sorting Visualizer</div>

            <div className='toolbox'>
                <div>
                    <div className='cspeed'>
                        <label>Speed</label>
                        <input type='range' onChange={selectSpeed} min='1' max='10' value={Math.ceil(400 / speed)} disabled={sorting}></input>
                    </div>
                    <div className='clength'>
                        <label>Length</label>
                        <input type='range' onChange={selectLength} min='5' max={100} step='1' disabled={sorting} value={len}></input>
                    </div>

                    <select onChange={selectAlgo} disabled={sorting} value={algo}>
                        <option value='bubbleSort'>Bubble Sort</option>
                        <option value='mergeSort'>Merge Sort</option>
                        <option value='quickSort'>Quick Sort</option>
                    </select>
                </div>

                <div>
                    <button onClick={generateRandomArray} disabled={sorting}>Randomize</button>
                    <button onClick={selectSort} disabled={sorting || completed}>Sort</button>
                </div>
            </div>
        </nav>
    )
}
export default Navbar