import { useState } from 'react';
import './Sudoku.scss'
const Cell = (props) => {
    const [value, setValue] = useState(props.value);
    const cell_class_name = ["sudoku_cell", props.is_given ? "sudoku_cell_given" : props.value ? "sudoku_cell_filled" : ""].join(' ');
    const isDisabled = (props.is_given);
    const onClick = () => {
        if (!value) {
            setValue(1);
        } else {
            const next_value = (value % 9) + 1;
            setValue(next_value);
        }
    }
    // TODO: check is valid.
    return (
        <button disabled={isDisabled} onClick={onClick} className={cell_class_name}>{value}</button>
    )
}

const MacroCell = (props) => {
    const final = [];
    const cells = props.cells ? props.cells : Array(9).fill({ value: null });
    for (const { value, is_given } of cells) {
        final.push(<Cell value={value} is_given={is_given ? is_given : false} />);
    }
    return (
        <div className="sudoku_macrocell">
            {final}
        </div>
    )
}

const ColGroup = (props) => {
    const final = [];
    for (let macrocell_id = 0; macrocell_id < 3; macrocell_id++) {
        const cells = [];
        for (const col of props.cols) {
            cells.push(col.slice(macrocell_id * 3, macrocell_id * 3 + 3));
        }
        final.push(<MacroCell key={macrocell_id} cells={cells.flat(Infinity)} />);
    }
    return (
        <div class="sudoku_col_group">
            {final}
        </div>
    );
}

const Board = (props) => {
    const final = [];
    for (let col_group_id = 0; col_group_id < 3; col_group_id++) {
        const col_data = props.board.slice(col_group_id * 3, col_group_id * 3 + 3);
        final.push(<ColGroup key={col_group_id} cols={col_data} />);
    }
    return (
        <div>
            {final}
        </div>
    );
}

const Sudoku = () => {
    const board = [
        [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
        ],
        [
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 1 },
        ],
        [
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 1 },
            { value: 2 },
        ],
        [
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
        ],
        [
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
        ],
        [
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
        ],
        [
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },

        ],
        [
            { value: 8 },
            { value: 9 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
        ],
        [
            { value: 9 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
        ],
    ];

    return (
        <Board board={board} />
    )
}

export default Sudoku;