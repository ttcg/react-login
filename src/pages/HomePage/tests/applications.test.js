import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Applications } from '../applications';
import ApplicationRow  from '../applicationRow';

it('should render Applications', () => {

    const data = [
        {
            "applicationName": "Test App1",
            "applicationTypeId": 1,
        },
        {
            "applicationName": "Test App2",
            "applicationTypeId": 2,
        }
    ];

    const component = shallow(<Applications applications={data} />);

    expect(component.find(ApplicationRow).length).toEqual(2);
    expect(toJson(component)).toMatchSnapshot();
});