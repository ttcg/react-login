import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ApplicationRow from '../applicationRow';

it('should renders ApplicationRow', () => {

    const data =
    {
        "applicationName": "Test App",
        "applicationTypeId": 999,
    };

    const component = shallow(<ApplicationRow data={data} />);

    expect(component.text()).toContain(data.applicationName);
    expect(toJson(component)).toMatchSnapshot();
});