import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'is-empty'
import {
    Col,
    Container,
    FormCheck,
    FormGroup,
    Row
} from 'react-bootstrap';

import { LoadingSpinner } from '../../components/LoadingSpinner'
import {
    getUserApplications
} from '../../redux/user/user.action'
import ApplicationRow from './applicationRow'
import postToUrl from '../../utilities/postToUrl'

export function Applications({
    isLoading,
    accessToken,
    applications,
    getUserApplications
}) {

    const [postToOrigin, setPostToOrigin] = useState(true);

    useEffect(() => {
        getUserApplications();
    }, [getUserApplications]);

    const replaceUrlToPost = url => {
        const currentEnv = getEnvFromUrl(url);
        let stsUrlToReplace;

        switch (currentEnv) {
            case "staging":
                stsUrlToReplace = "https://staging.ttcg.com";
                break;
            case "preview":
                stsUrlToReplace = "https://se-preview.ttcg.com";
                break;
            default:
                stsUrlToReplace = "https://test.ttcg.com";
                break;
        }

        return url.replace(stsUrlToReplace, "http://localhost/")
    }

    const getEnvFromUrl = url => {
        for (let item of ['test', 'staging', 'preview']) {
            if (url.indexOf(item) > 0)
                return item;
        }
    }

    const handleAppButtonClick = (data) => {

        const params = {
            'UserId': data.applicationUserId,
            'ApplicationType': data.applicationTypeId,
            'identityToken': accessToken
        };

        const stsUrl = postToOrigin ? data.applicationUrl : replaceUrlToPost(data.applicationUrl) ;

        postToUrl(stsUrl, params);        
    }

    return (
        <>
            {isLoading
                ?
                <LoadingSpinner />
                :
                !isEmpty(applications) &&
                <Container>
                    <Row>
                        <Col md={8}>
                            {applications                                
                                .map((data, key) =>
                                    <ApplicationRow
                                        key={key}
                                        data={data}
                                        handleAppButtonClick={handleAppButtonClick} />
                                )}
                        </Col>
                        <Col md={4} style={{ paddingTop: '50px' }}>
                            <FormGroup controlId="formBasicChecbox">
                                <FormCheck type="checkbox" label="Post To Original Url?" checked={postToOrigin}
                                    onChange={e => setPostToOrigin(e.target.checked)} className="font-weight-bold" />
                                Uncheck if you want to post to localhost
                            </FormGroup>

                        </Col>

                    </Row>
                </Container>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.UserReducer.isLoading,
        applications: state.UserReducer.applications
    };
};

const mapDispatchToProps = {
    getUserApplications
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);