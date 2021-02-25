import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Cell, MacroCell } from './index.js';

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

    it('should not be marked as invalid with unique numbers', () => {
        const macrocell_data_invalid = [{ cell_id: 0, value: 1 }, { cell_id: 1, value: 2 },];
        const testComponent = render(
            <MacroCell cells={macrocell_data_invalid} />
        );
        const macrocell = testComponent.container.firstChild;
        expect(macrocell.classList.contains('sudoku_macrocell_invalid')).toBe(false);
    });
    it('should marked as invalid with duplicate numbers', () => {
        const macrocell_data_invalid = [{ cell_id: 0, value: 1 }, { cell_id: 1, value: 1 },];
        const testComponent = render(
            <MacroCell cells={macrocell_data_invalid} />
        );
        const macrocell = testComponent.container.firstChild;
        expect(macrocell.classList.contains("sudoku_macrocell_invalid")).toBe(true);
    });
})