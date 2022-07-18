import { useEffect, useState, useCallback } from "react";



export default function Jeopardy({wordOfTheDay , overview} : {wordOfTheDay: string , overview:string}) {


  const [currentGuess, setCurrentGuess] = useState('');
  const [gameIsOver, setGameIsOver] = useState<"WON" | "LOST" | null>(null);


  const addLetterToWord = useCallback(
    (key: string) => {

      if (!currentGuess.includes(key.toUpperCase())) setCurrentGuess(prevGuess => prevGuess+key.toUpperCase())
    },
    [currentGuess]
  );



  const onkeydown = useCallback(
    async (ev: any) => {

      
      addLetterToWord(ev.key);
    },
    [addLetterToWord]
  );

  useEffect(() => {
    if (!gameIsOver) {
      window.addEventListener("keydown", onkeydown);
    }

    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [ gameIsOver, onkeydown]);

  return (
    <div>
        <h6>{overview}</h6>
      <div>
        
            <WordRow
              word={currentGuess}
              wordOfTheDay={wordOfTheDay}
            ></WordRow>
         
      </div>
      <div>Used letters: {JSON.stringify(currentGuess)}</div>
      {gameIsOver && <h1>{`YOU ${gameIsOver}`}</h1>}
    </div>
  );
}

function WordRow({
  word,
  wordOfTheDay
}: {
  word: string ,
  wordOfTheDay:string
}) {

  const renderRow = (word: string) => {

    let row = wordOfTheDay.split("")

    return row.map((w, index) => {
      let color = (word.includes(w)) ? "lightgreen" : "lightgrey";

      if (w !== ' ') {
      return (
        <div
          style={{
            fontSize: 36,
            width: 50,
            height: 50,
            border: "1px solid black",
            backgroundColor: color,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {(word.includes(w)) ? w : ' ' }
        </div>
      );
        }
        else {
          return <div style={{width:50}}></div>
        }



    
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 5,
        rowGap: 5,
        margin: "10px 0",
      }}
    >
      {renderRow(word)}
    </div>
  );
}
