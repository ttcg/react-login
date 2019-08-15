import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faAddressCard,
    faChartBar,
    faCheckSquare,
    faEye,
    faFile,
    faFolder
} from '@fortawesome/free-regular-svg-icons'
import "./applicationRow.css"

const ApplicationRow = ({ data, handleAppButtonClick }) => {

    const getIconName = id => {
        switch (id) {
            case 0: return faCheckSquare;
            case 1: return faFile;
            case 2: return faEye;
            case 3: return faChartBar;
            case 4: return faAddressCard;
            default: return faFolder;
        }
    }

    const ApplicationName = ({ id }) => {
        switch (id) {
            case 0: return "Inspection";
            case 1: return "Portal";
            case 2: return "Reports";
            case 3: return "Business Intelligence";
            case 4: return "Social Network";
            default: return "Unknown";
        }
    }

    return (
        <div className="wrapper" onClick={() => handleAppButtonClick(data)}>
            <div className="image-wrapper">
                <FontAwesomeIcon size="3x" icon={getIconName(data.applicationTypeId)} />
            </div>
            <div className="text-wrapper">
                {data.applicationName}
                <span className='applicationText'>
                    <ApplicationName id={data.applicationTypeId} />

                </span>
            </div>
        </div>
    )
}

export default ApplicationRow;