import { AuthService } from '../services'

export default function getEndPoint() {

    const env = AuthService.getEnvironment();
    
    var url;

    switch (env) {
        case "staging": 
            url = "https://staging.ttcg.com";
            break;
        case "preview":
            url = "https://preview.ttcg.com";
            break;
        default:
            url = "https://test.ttcg.com";
            break;
    }

    url = `${url}/api/users`

    return {
        commandUrl: `${url}/command`,
        queryUrl: `${url}/query`
    }

}