import React, { useEffect, useState } from "react";
import { useGetMostPopular } from "../../api/popular";
import MovieCard from "../MovieCard";
import { API_MOST_POPULAR } from "../../constants";
import { Heading2 } from "../../styles";
import MySpinner from "../Spinner";
import { MovieInterface, PagesInterface } from "../../interfaces";
import { Button } from "react-bootstrap";
import { BsFillCaretDownFill , BsFillCaretUpFill } from "react-icons/bs";

type SortingType = "ASC" | "DESC" | "UNSORTED";

const SortingStateMachine: { [key: string]: string } = {
  ASC: "DESC",
  DESC: "UNSORTED",
  UNSORTED: "ASC",
};

export default function MostPopular() {
  const [sortType, setSortType] = useState<SortingType>("UNSORTED");

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetMostPopular(API_MOST_POPULAR);

  useEffect(() => {
    // const onScroll = async (event: Event & { target: Document })=> {
    const onScroll = async (event: Event) => {
      let fetching = false;

      const { scrollHeight, scrollTop, clientHeight } = (
        event.target as Document
      )?.scrollingElement!;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;

        if (hasNextPage) {
          await fetchNextPage();
        }

        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const sortByrate = (data: MovieInterface[]) => {
    let originalData = [...data];

    if (sortType === "UNSORTED") return originalData;
    else
      return [
        ...originalData.sort((a: any, b: any) =>
          sortType === "ASC"
            ? b.vote_average - a.vote_average
            : a.vote_average - b.vote_average
        ),
      ];
  };

  if (isError) {
    return <Heading2>ERROR {JSON.stringify(error)}</Heading2>;
  }

  if (isLoading) {
    return <MySpinner></MySpinner>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Heading2>Most Popular Movies</Heading2>

      <div className="d-grid gap-2">
        <Button
          className="m-5"
          variant="outline-info"
          size="sm"
          onClick={() =>
            setSortType(SortingStateMachine[sortType] as SortingType)
          }
        >
          Sort by rating {sortType === "ASC" ? <BsFillCaretUpFill/> : sortType === "DESC" ? <BsFillCaretDownFill/> : null}
        </Button>
      </div>
     
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {data?.pages.map((page: PagesInterface, i: number) => (
          <React.Fragment key={i}>
            {sortByrate(page.results).map((movie: MovieInterface) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && <MySpinner></MySpinner>}
    </div>
  );
}
