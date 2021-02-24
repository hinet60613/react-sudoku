import { useState } from 'react';
import './Sudoku.scss'
const Cell = (props) => {
    //const [value, setValue] = useState(props.value);
    const { is_given } = props;
    const cell_class_name = ["sudoku_cell", props.is_given ? "sudoku_cell_given" : props.value ? "sudoku_cell_filled" : ""].join(' ');
    const isDisabled = (is_given);
    //debugger;

    // TODO: check is valid.

    return (
        <button
            disabled={isDisabled}
            onClick={props.onClick}
            className={cell_class_name}
        >
            {props.value}
        </button>
    )
}

const MacroCell = (props) => {
    const final = [];
    //const _cells = props.cells ? props.cells : Array(9).fill({ value: null });
    const [cells, setCells] = useState(
        props.cells.reduce((acc, it) => {
            const { cell_id, ...res } = it;
            acc[cell_id] = res;
            return acc;
        }, {})
    );

    const isInvalid = () => {
        const value_list = Object.values(cells).map(cell => cell.value);
        const value_set = new Set(value_list);
        return value_set.size !== value_list.length;
    }

    const handleClick = (cell_id) => {
        const { value, ...res_data } = cells[cell_id];
        const new_val = value % 9 + 1;
        setCells({
            ...cells,
            [cell_id]: {
                ...res_data,
                value: (cell_id in cells) ? new_val : 1,
            },
        });
    }

    for (const [cell_id, obj] of Object.entries(cells)) {
        const { value, is_given } = obj;
        final.push(
            <Cell
                key={`cell_${cell_id}`}
                value={value}
                is_given={is_given ? is_given : false}
                onClick={() => handleClick(cell_id)}
            />
        );
    }
    return (
        <div className={`sudoku_macrocell ${isInvalid() ? "sudoku_macrocell_invalid" : ""}`}>
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
        final.push(
            <MacroCell
                key={`macrocell_${macrocell_id}`}
                macro_cell_id={props.col_group_id * 3 + macrocell_id}
                cells={cells.flat(Infinity)}
            />
        );
    }
    return (
        <div className="sudoku_col_group">
            {final}
        </div>
    );
}

const Board = (props) => {
    const final = [];
    const board = props.board.map(
        (col, col_idx) => col.map(
            (obj, idx) => ({
                cell_id: col_idx * 9 + idx,
                value: obj,
            })
        )
    );
    for (let col_group_id = 0; col_group_id < 3; col_group_id++) {
        const col_data = board.slice(col_group_id * 3, col_group_id * 3 + 3);
        final.push(
            <ColGroup
                key={`colgroup_${col_group_id}`}
                col_group_id={col_group_id}
                cols={col_data}
            />);
    }
    return (
        <div>
            {final}
        </div>
    );
}

const Sudoku = () => {
    const board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9,],
        [4, 5, 6, 7, 8, 9, 1, 2, 3,],
        [7, 8, 9, 1, 2, 3, 4, 5, 6,],
        [2, 3, 4, 5, 6, 7, 8, 9, 1,],
        [5, 6, 7, 8, 9, 1, 2, 3, 4,],
        [8, 9, 1, 2, 3, 4, 5, 6, 7,],
        [3, 4, 5, 6, 7, 8, 9, 1, 2,],
        [6, 7, 8, 9, 1, 2, 3, 4, 5,],
        [9, 1, 2, 3, 4, 5, 6, 7, 8,],
    ];

    return (
        <Board board={board} />
    )
}

export default Sudoku;
export { Cell, MacroCell, ColGroup, Board };