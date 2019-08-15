import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'react-bootstrap';
import LoadingSpinner  from '../LoadingSpinner';

it('renders without crashing', () => {
    const component = shallow(<LoadingSpinner />);
    expect(component.find(Spinner).length).toEqual(1);
});
