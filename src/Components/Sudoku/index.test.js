import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Cell, ColGroup, MacroCell } from './index.js';

describe('<Cell />', () => {
    it('can be rendered', () => {
        const val = 1;
        render(<Cell value={val} />);

    });
    it('can be clicked', () => {
        const mockOnClick = jest.fn();
        const testComponent = renderer.create(
            <Cell value="click" onClick={() => mockOnClick()} />
        ).root;
        const cell = testComponent.findByProps({ value: "click" });
        expect(cell).toBeDefined();
        cell.props.onClick();
        expect(mockOnClick).toHaveBeenCalled();
    })
});

describe('<Macrocell />', () => {
    it('can be rendered', () => {
        const cells = [{ cell_id: 0, value: 1 }]
        const testComponent = render(<MacroCell cells={cells} />);
        expect(testComponent).toBeDefined();
    })

    describe('should not be marked as invalid with unique numbers', () => {
        it('contains 9 numbers', () => {
            const macrocell_data_valid = [
                { cell_id: 0, value: 1 },
                { cell_id: 1, value: 2 },
                { cell_id: 2, value: 3 },
                { cell_id: 10, value: 4 },
                { cell_id: 11, value: 5 },
                { cell_id: 12, value: 6 },
                { cell_id: 19, value: 7 },
                { cell_id: 20, value: 8 },
                { cell_id: 21, value: 9 },
            ];
            const testComponent = render(<MacroCell cells={macrocell_data_valid} />);
            const macrocell = testComponent.container.firstChild;
            expect(macrocell.classList.contains('sudoku_macrocell_invalid')).toBe(false);
        });
        it('contains less than 9 numbers', () => {
            const macrocell_data_valid = [
                { cell_id: 0, value: 1 },
                { cell_id: 1, value: 2 },
                { cell_id: 2, value: 3 },
                { cell_id: 10, value: null },
                { cell_id: 11, value: null },
                { cell_id: 12, value: null },
                { cell_id: 19, value: 7 },
                { cell_id: 20, value: 8 },
                { cell_id: 21, value: 9 },
            ];
            const testComponent = render(<MacroCell cells={macrocell_data_valid} />);
            const macrocell = testComponent.container.firstChild;
            expect(macrocell.classList.contains('sudoku_macrocell_invalid')).toBe(false);
        });
    });
    it('should marked as invalid with duplicate numbers', () => {
        const macrocell_data_invalid = [{ cell_id: 0, value: 1 }, { cell_id: 1, value: 1 }];
        const testComponent = render(
            <MacroCell cells={macrocell_data_invalid} />
        );
        const macrocell = testComponent.container.firstChild;
        expect(macrocell.classList.contains("sudoku_macrocell_invalid")).toBe(true);
    });
});

describe('<ColGroup />', () => {
    const cols = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9,],
        [4, 5, 6, 7, 8, 9, 1, 2, 3,],
        [7, 8, 9, 1, 2, 3, 4, 5, 6,]
    ];
    const data = cols.map((col, col_idx) => {
        col.map((val, idx) => ({
            cell_id: col_idx * 9 + idx,
            value: val,
        }))
    });

    it('can be rendered', () => {
        const testComponent = render(<ColGroup cols={cols} />);
        expect(testComponent).toBeDefined();
    });

});