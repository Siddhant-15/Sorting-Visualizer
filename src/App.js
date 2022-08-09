import React, { useState, useEffect } from 'react'
import './App.css';

//components
import Navbar from './components/Navbar/Navbar'
import ListBlocks from './components/ListBlocks/ListBlock'
import Legends from './components/Legends/Legends'




// Algorithms
import bubbleSort from './algorithms/bubbleSort'
import mergeSort from './algorithms/mergeSort'
import quickSort from './algorithms/quickSort'



function App() {
       //Generating Random(shuffled) array from length(1 to len)
       const generateRandomArray = (len) => {
                setCompleted(false)
		setSorting(false)
		setSortedIndex([])
                  
                 const randomArray = Array.from(Array(len + 1).keys()).slice(1)
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys

                 for(let i = randomArray.length - 1; i > 0; i--) {
                  const randomIndex = Math.floor(Math.random()*(i-1))
                  //var item = items[Math.floor(Math.random()*items.length)];
                  const temp = randomArray[i]

                  randomArray[i] = randomArray[randomIndex]
                  randomArray[randomIndex] = temp

                 }

                 setBlocks(randomArray)
                 
       }
       //States
       const [algo, setAlgo] = useState('bubbleSort')
       const [len, setLength] = useState(30)
       const [blocks, setBlocks] = useState([])
       const [sorting, setSorting] = useState(false)
       const [completed, setCompleted] = useState(true)
       const [speed, setSpeed] = useState(250)
       const [compare, setCompare] = useState([])
       const [swap, setSwap] = useState([])
       const [sortedIndex, setSortedIndex] = useState([])


       //Generating Random Array Every Time the length/algorithm is changed by the user
       useEffect(() => {
        generateRandomArray(len)
       },[len, algo]) 

       //Setting to selected Algorithm
       const selectAlgo = (event) => {
            setAlgo(event.target.value)
       }

       //handling the Length of the array
       const selectLength = (event) => {
               setLength(Number(event.target.value))
       }

       //handling the Speed of sorting
       const selectSpeed = (event) => {
             setSpeed(Math.ceil(400/Number(event.target.value)))
       }

       //Sorting According to the Algorithm
       const selectSort = () => {

              const sortAccOrder = (order) => {
                 (function loop(i) {
                     setTimeout(function() {
                         const[j, k, arr, index] = order[i]
                    setCompare([j,k])
                    setSwap([])

                    if(index != null){
                      setSortedIndex((prevState) => (
                        [...prevState, index]
                      ))
                    }

                    if(arr){
                      setBlocks(arr)
                      if(j != null || k != null){
                        setSwap([j,k])
                      }
                    }
                    if(++i < order.length){
                      loop(i)
                    }else{
                      setSorting(false)
                      setCompleted(true)
                    }
                    
                }, speed)
              })(0)
       }

       setSorting(true)

       algo == 'bubbleSort' ? sortAccOrder(bubbleSort(blocks)) :
       algo == 'mergeSort' ? sortAccOrder(mergeSort(blocks)) :
       algo == 'quickSort' ? sortAccOrder(quickSort(blocks)) : (() => {
           setSorting(false)
           setCompleted(true)
       })()
      }






  return (
    <div className="App">
         <Navbar
                generateRandomArray={()=> generateRandomArray(len)} 
                selectLength={selectLength}
                selectSpeed={selectSpeed}
                selectAlgo={selectAlgo}
                selectSort={selectSort}sorting ={sorting}
                completed={completed}
                len={len}
                speed={speed}
                algo={algo}
          />

          <ListBlocks
                blocks={blocks}
                compare={sorting && compare}
                swap={sorting && swap}
                sorted={sortedIndex}
         />

         <Legends algo = {algo}/>
            
    </div>
    
  );
}

export default App;
