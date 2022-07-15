import { useEffect, useState, KeyboardEvent, useCallback, useMemo } from "react";
import { QueryCache } from "react-query";
import { useGetMostPopular } from "../../api/popular";
import { API_MOST_POPULAR } from "../../constants";

const boardAttempts = 6;

function isCharacterALetter(char: string) {
  return /[a-zA-Z]/.test(char);
}

const initialValue = new Array(boardAttempts).fill("");

const wordOfTheDay = "PARIS";

export default function Wordle() {


  const [board, setBoard] = useState(initialValue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameIsOver, setGameIsOver] = useState<"WON" | "LOST" | null>(null);

  //const currentWord = board[currentIndex];
  const currentWord = useMemo(()=> board[currentIndex], [board, currentIndex] )

  const addLetterToWord = useCallback(
    (key: string) => {
      if (currentWord.length >= wordOfTheDay.length) return;
      else
        setBoard((prevBoard) => {
          let newBoard = [...prevBoard];
          newBoard[currentIndex] = currentWord + key.toUpperCase();
          return newBoard;
        });
    },
    [currentIndex, currentWord]
  );

  const removedLetterFromWord = useCallback(() => {
    if (currentWord.length === 0) return;
    else
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        newBoard[currentIndex] = currentWord.substring(
          0,
          currentWord.length - 1
        );
        return newBoard;
      });
  }, [currentIndex, currentWord]);

  const submitWord = useCallback(() => {
    if (currentWord.length !== wordOfTheDay.length) return;
    else {
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        newBoard[currentIndex] = currentWord;

        return newBoard;
      });

      if (currentWord === wordOfTheDay) {
        setGameIsOver("WON");
      } else if (currentIndex === board.length - 1) {
        setGameIsOver("LOST");
      }

      setCurrentIndex((prev) => prev + 1);
    }
  }, [board.length, currentIndex, currentWord]);

  // const onkeydown = useCallback( async (ev :  KeyboardEvent) => {
  const onkeydown = useCallback(
    async (ev: any) => {
      // { target: body, key: "Enter", charCode: 0, keyCode: 13 }

      //keycode deprecated???

      if (ev.key === "Enter") {
        submitWord();
      } else if (ev.key === "Backspace") {
        removedLetterFromWord();
      } else {
        if (isCharacterALetter(ev.key)) addLetterToWord(ev.key);
      }

      //{ target: body, key: "Backspace", charCode: 0, keyCode: 8 }
    },
    [addLetterToWord, removedLetterFromWord, submitWord]
  );

  //onkeypress
  useEffect(() => {
    if (!gameIsOver) {
      window.addEventListener("keydown", onkeydown);
    }

    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [currentWord, gameIsOver, onkeydown]);

  return (
    <div>
      <div>current word: {JSON.stringify(currentWord)}</div>
      <div>current board: {JSON.stringify(board)}</div>

      <div>
        {board.map((row, index) => {
          return (
            <WordRow
              isCurrentword={currentIndex === index}
              word={row}
            ></WordRow>
          );
        })}
      </div>
      {gameIsOver && <h1>{`YOU ${gameIsOver}`}</h1>}
    </div>
  );
}

function WordRow({
  word,
  isCurrentword,
}: {
  word: string;
  isCurrentword: boolean;
}) {

  const renderRow = (word: string) => {
    // let row = new Array(rowSize).fill(null);
    let row = wordOfTheDay.split("")

    return row.map((w, index) => {
      let color = "lightgrey";

      if (!isCurrentword) {
        if (word?.[index] === wordOfTheDay[index]) {
          color = "lightgreen";
        } else if (wordOfTheDay.includes(word?.[index])) {
          color = "bisque";
        }
      }
      if (wordOfTheDay[index]) {

      
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
          {word?.[index]}
        </div>
      );
        }
        else return <div style={{width:50}}>{" "}</div>
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
