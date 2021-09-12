import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("renders without crashing", () => {
  render(<Board />);
});

it("matches the snapshot", ()=>{
    const { asFragment } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1}/>);
    expect( asFragment()).toMatchSnapshot();
});

it("flip the clicked cell and the cells around it", () => {
  const { queryAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1.0} />);
  const cells = queryAllByRole("cellButton");
  fireEvent.click(cells[4]);
  
  const lightOnIndices = [0,2,6,8];
  for(let i =0; i<cells.length; i++){
      if(lightOnIndices.includes(i)){
          expect(cells[i]).toHaveClass("Cell-lit");
      }else{
          expect(cells[i]).not.toHaveClass("Cell-lit");
      }
  }
});

it("Show you won message", () => {
    const { queryAllByRole, queryByText } = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1.0} />);
    const cells = queryAllByRole("cellButton");
    fireEvent.click(cells[1]);
    
    expect(queryByText("You Won!")).toBeInTheDocument();
  });


