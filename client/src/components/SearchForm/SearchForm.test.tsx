import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import renderer from 'react-test-renderer';

import SearchForm from ".";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

import { QueryClient, QueryClientProvider } from "react-query";
//import SearchResults from "../SearchResults";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

afterEach(cleanup);

jest.setTimeout(10000);

       // Set up a Jest mock function to check any props.
// const mockChildComponent = jest.fn();

// // Mock the child component file, and grab all props passed to it
// // and pass them to the Jest mock function so it can listen.
// jest.mock("../SearchResults", () => (props) => {
//   mockChildComponent(props);

//   // Return something for React to render. I like creating
//   // an element to pass through as it
//   // helps with visually debugging if needed.
//   return <mock-childComponent />;
// });

describe("Search Form Component", () => {
  function tree() {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SearchForm
              setShowPopular={() => console.log("showform prop function")}
            ></SearchForm>
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  it("rendered Form", () => {
    tree();

    const element = screen.getByTestId("searchForm");
    //expect(element).toBeTruthy();
    //or
    expect(element).toBeInTheDocument();
  });

  it("rendered search input", () => {
    tree();

    const input = screen.getByTestId("searchInput");

    expect(input).toBeInTheDocument();
  });

  it("show search string after input change", async () => {

    
    tree();

    const input = screen.getByTestId("searchInput");

    const inputWord = "matrix";

    //dont need act in this case if using waitFor
    // await act(async () => {
    fireEvent.change(input, { target: { value: inputWord } });
    // });

    //test input directly
    // expect(input.value).toBe('matrix')

    await new Promise((r) => setTimeout(r, 3000));

    await waitFor(() => {
      const searchTextResults = screen.getByTestId("displaySearch");
      expect(searchTextResults.innerHTML).toBe(inputWord);
    });

  });

  it("show results after input change", async () => {
    tree();

    const inputElement = screen.getByTestId("searchInput");

    const inputWord = "matrix2";

    fireEvent.change(inputElement, { target: { value: inputWord } });

    await new Promise((r) => setTimeout(r, 3000));

    await waitFor(() => {
        
      //expect(screen.getByTestId('childComponent')).toBeInTheDocument();

      const searchTextResults2 = screen.getByTestId(
        "displaySearchOtherComponent"
      );
      expect(searchTextResults2.innerHTML).toBe(inputWord);
    });
  });
  it("match snapshot", async () => {

    const treeSnapshot = renderer.create(<Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SearchForm
              setShowPopular={() => console.log("showform prop function")}
            ></SearchForm>
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>).toJSON()
    expect(treeSnapshot).toMatchSnapshot()

  })

    // it("---show results after input change", async () => {

    //   tree();

    //   const inputElement = screen.getByTestId("searchInput");

    //   const inputWord = "lost";

    //     fireEvent.change(inputElement, { target: { value: inputWord } });

    //     await new Promise((r) => setTimeout(r, 5000));

    //     await waitFor(() => {
    //     expect(mockChildComponent).toHaveBeenCalledWith(
    //       expect.objectContaining({
    //         multi: false,
    //         searchString: "lost"
    //       })
    //     );
    //   })

    // });
});
