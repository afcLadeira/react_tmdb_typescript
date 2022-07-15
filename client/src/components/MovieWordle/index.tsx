import { useEffect, useRef, useState } from "react";
import { useGetMostPopular } from "../../api/popular";
import { API_MOST_POPULAR } from "../../constants";
import Jeopardy from "./jeopardy";
import Wordle from "./wordle";

export default function MovieWordle() {


  const [selectedTab , setSelectedTab] = useState('jeopardy')
  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetMostPopular(API_MOST_POPULAR);


  const [wordOfTheDay,setWordOfTheDay] = useState<string | null>(null)
  const [overview,setOverview] = useState<string>('')

  useEffect(() => {

    if (data) {
      setWordOfTheDay(
      data?.pages[0].results[
        Math.floor(Math.random() * 20)
      ]?.title.toUpperCase() || null)


      setOverview(data?.pages[0].results[
        Math.floor(Math.random() * 20)
      ]?.overview || '')
    }

  },[data])

  return (
    <div>
      <div style={{display:'flex' , gap:10 ,marginBottom:20}}>
        <div style={{boxShadow: '1px 3px #888888' ,cursor:'pointer',padding:10,flex:1,backgroundColor:selectedTab === 'jeopardy' ? 'lightcyan' : 'white'}} onClick={() => setSelectedTab('jeopardy')}>Jeopardy</div>
        <div style={{boxShadow: '1px 3px #888888' ,cursor:'pointer',padding:10,flex:1,backgroundColor:selectedTab === 'wordle' ? 'lightcyan' : 'white'}} onClick={() => setSelectedTab('wordle')}>Wordle</div>
      </div>
      {selectedTab === 'jeopardy' && wordOfTheDay && <Jeopardy overview={overview} wordOfTheDay={wordOfTheDay}></Jeopardy>}
 
      {selectedTab === 'wordle' && <Wordle></Wordle>}
    </div>
  );
}