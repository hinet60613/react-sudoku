import { useState } from 'react';
import './Sudoku.scss'
const Cell = (props) => {
    const [value, setValue] = useState(props.value);
    const cell_class_name = ["sudoku_cell", props.is_given ? "sudoku_cell_given" : props.value ? "sudoku_cell_filled" : ""].join(' ');
    const isDisabled = (props.is_given);
    const onClick = () => {
        setValue(10);
    }
    return (
        <button disabled={isDisabled} onClick={onClick} className={cell_class_name}>{value}</button>
    )
}

const MacroCell = (props) => {
    const final = [];
    console.log(props.cells);
    const cells = props.cells ? props.cells : Array(9).fill({ value: null });
    for (const { value, is_given } of cells) {
        final.push(<Cell value={value} is_given={is_given ? is_given : false} />);
    }
    return (
        <div className="sudoku_macrocell">
            {final}
        </div>
    )
    /*
    (
        <div className="sudoku_macrocell">
            <Cell value="1" is_given />
            <Cell value="" />
            <Cell value="3" />
            <Cell value="4" />
            <Cell value="5" />
            <Cell value="6" />
            <Cell value="7" />
            <Cell value="8" />
            <Cell value="9" />
        </div>
    );
    */
}
const Col = () => {
    const cells = [
        { value: 1, is_given: true },
        { value: 2, },
        { value: 3, },
        { value: 4, },
        { value: 5, },
        { value: 6, },
        { value: 7, },
        { value: 8, },
        { value: 9, }
    ];
    return (
        <div className="sudoku_col">
            <MacroCell cells={[...cells]} />
            <MacroCell />
            <MacroCell />
        </div>
    )
}
const Row = () => {
    return (
        <div>
            <Col />
            <Col />
            <Col />
        </div>
    )
}
const Sudoku = () => {

    return (
        <div>
            <Col />
            <Col />
            <Col />
        </div>
    );
}

export default Sudoku;