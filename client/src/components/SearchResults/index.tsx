import MovieCard from "../MovieCard";
import MySpinner from "../Spinner";
import Badge from "react-bootstrap/Badge";
import { getSearchEndpoint } from "../../constants";
import { useSearchInfo } from "../../api/search";
import { Heading2 } from "../../styles";
import { MovieInterface } from "../../interfaces";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

interface SearchResultsProps {
  searchString: string | null;
  multi: boolean | undefined | null;
}

enum MEDIATYPES {
  "ALL" = "ALL",
  "MOVIES" = "MOVIES",
  "TV" = "TV",
  "PERSON" = "PERSON",
}

export default function SearchResults({
  searchString,
  multi,
}: SearchResultsProps) {
  const search_url =
    multi === null || !searchString
      ? ""
      : getSearchEndpoint(multi, searchString);

  const { isLoading, error, data } = useSearchInfo(
    search_url,
    searchString,
    multi
  );

  const [mediaType, setMediaType] = useState("ALL");

  //! THIS TYPE OF SORTING WAS AN EXPERIENCE
  //!SEE COMPONENT MOSTPOPULAR FOR A CLEANER SOLUTION
  const previousDataRef: any = useRef<any>();

  const [sortedData, setSortedData] = useState<any>(data);

  useEffect(() => {
    console.log("useEffect");
    if (!sortedData || previousDataRef.current !== data) {
      setSortedData(data);
    }
    previousDataRef.current = data;
  }, [data, sortedData]);

  const onSort = () => {
    setSortedData({
      ...sortedData,
      results: [
        ...sortedData.results.sort(
          (a: any, b: any) => b.vote_average - a.vote_average
        ),
      ],
    });
  };

  const filterData = (data: any[]) => {
    if (mediaType === "MOVIE")
      return data.filter((m) => m.media_type === "movie");
    else if (mediaType === "TV")
      return data.filter((m) => m.media_type === "tv");
    else if (mediaType === "PERSON")
      return data.filter((m) => m.media_type === "person");
    else return data;
  };

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (isLoading) {
    <MySpinner></MySpinner>;
  }

  if (!searchString) return null;

  return (
    <div data-testid="childComponent">
      {/* for jest test */}
      {/* <h1 data-testid="displaySearchOtherComponent">{searchString}</h1> */}
      {data ? (
        <div style={{ textAlign: "center", padding: 6 }}>
          <Heading2>Search Results</Heading2>
          <h5>
            {data.total_results} results for{" "}
            <Badge bg="primary">{searchString}</Badge>
          </h5>
        </div>
      ) : null}

      <div style={{ display: "flex", gap: 5, width: "100%" }}>
        <Button
          style={{ flex: 1 }}
          variant={mediaType === MEDIATYPES.ALL ? "primary" : "light"}
          onClick={() => setMediaType(MEDIATYPES.ALL)}
        >
          All
        </Button>
        <Button
          style={{ flex: 1 }}
          variant={mediaType === MEDIATYPES.MOVIES ? "primary" : "light"}
          onClick={() => setMediaType(MEDIATYPES.MOVIES)}
        >
          Movies
        </Button>
        <Button
          style={{ flex: 1 }}
          variant={mediaType === MEDIATYPES.TV ? "primary" : "light"}
          onClick={() => setMediaType(MEDIATYPES.TV)}
        >
          TV Shows
        </Button>
        <Button
          style={{ flex: 1 }}
          variant={mediaType === MEDIATYPES.PERSON ? "primary" : "light"}
          onClick={() => setMediaType(MEDIATYPES.PERSON)}
        >
          Persons
        </Button>
      </div>
      <div className="d-grid gap-2">
        <Button
          className="m-5"
          variant="outline-info"
          size="sm"
          onClick={() => onSort()}
        >
          Sort by most rated
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
        {sortedData &&
          filterData(sortedData.results).map((item: MovieInterface) => (
            <MovieCard key={item.id} movie={item}></MovieCard>
          ))}
      </div>
    </div>
  );
}
