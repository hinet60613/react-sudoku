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
    it('should render Macrocell', () => {
        const cells = [
            {
                cell_id: 0,
                value: 1
            }
        ]
        render(<MacroCell cells={cells} />);
    })
})