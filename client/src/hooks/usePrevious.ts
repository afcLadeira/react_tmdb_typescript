

//*found this custom hook for getting previous state with useRef
//*not used in project, just reference for future projects maybe
//*added typescript

import { useEffect, useRef } from "react";

function usePrevious<T extends undefined>(value : T ) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
  }
  export default usePrevious;
  
//   To use the custom Hook within your app, write the following code:
  
//   function Counter() {
//     const [count, setCount] = useState(0);
//     // 👇 look here
//     const prevCount = usePrevious(count)
  
//     return <h1> Now: {count}, before: {prevCount} </h1>;
//   }