import jwt from 'jsonwebtoken';
import moment from 'moment'

const secretKey = 'ttcg-react-app'

export function mockAuthenticate(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (data.email === "ttcg@gmail.com" && data.password === "ttcgreact") {

                var objToSign = {
                    "userid": "fakeId123",
                    "exp": parseInt(moment().add(20, 'm').format('X'))
                }

                return resolve({
                    succeeded: true,
                    token: jwt.sign(objToSign, secretKey)
                })
            }
            else {
                return resolve({
                    succeeded: false
                })
            }
        }, 1000)
    })
}

export function mockGetAccessToken(data) {
    return new Promise((resolve, reject) => {
        var objToSign = {
            "userid": "fakeId123",
            "exp": parseInt(moment().add(20, 'm').format('X'))
        }

        return resolve({ accessToken: jwt.sign(objToSign, secretKey) })
    })
}

export function mockGetUserApplications(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                applications: [
                    {
                        "applicationName": "Portal 3",
                        "applicationTypeId": 1,
                        "applicationUserId": "123",
                        "applicationUrl": "https://www.website.com/postdata.aspx"
                    },
                    {
                        "applicationName": "Inspection 1.2",
                        "applicationTypeId": 0,
                        "applicationUserId": "456",
                        "applicationUrl": "https://www.website.com/postdata.aspx"
                    },
                    {
                        "applicationName": "My Reports",
                        "applicationTypeId": 2,
                        "applicationUserId": "789",
                        "applicationUrl": "https://www.website.com/postdata.aspx"
                    },
                    {
                        "applicationName": "BI",
                        "applicationTypeId": 3,
                        "applicationUserId": "345",
                        "applicationUrl": "https://www.website.com/postdata.aspx"
                    },
                    {
                        "applicationName": "Networking",
                        "applicationTypeId": 4,
                        "applicationUserId": "777",
                        "applicationUrl": "https://www.website.com/postdata.aspx"
                    }
                ]
            })
        }, 1000)
    })
}