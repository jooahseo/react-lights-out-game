import {render, fireEvent} from "@testing-library/react";
import Cell from "./Cell";

it("renders without crashing", ()=>{
    render(<Cell/>);
});

it("matches the snapshot", ()=>{
    const {asFragment} = render(<Cell/>);
    expect(asFragment()).toMatchSnapshot();
})

it("flips", ()=>{
    const { queryByTestId } = render(<Cell/>);
    const selectedCell = queryByTestId("1-1");
    console.log(selectedCell);
    fireEvent.click(selectedCell);
    expect(selectedCell).not.toHaveClass("Cell-lit");
})