import React from 'react'

const Counter = ({count,setCount}) => {
    return (
        <>
            <div>Counter</div>
            <p>Count: {count}</p>
            <button className="ml-2 bg-blue-800 test-white border-2 rounded px-2 py-1" onClick = {() => setCount(count + 1)}>Click Me</button>
            <button className = "ml-2 bg-red-800 test-white border-2 rounded px-2 py-1" onClick={() => setCount(count -1)}>Decrese</button>
            <button className = "ml-2 bg-slate-800 test-white border-2 rounded px-2 py-1" onClick = {() => setCount(0)}>Reset</button>
        </>

    )
}

export default Counter