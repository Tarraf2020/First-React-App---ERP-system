import CookieService from './CookieService';
import { useHistory } from "react-router-dom";

export default function Loginstatus() {


    let history = useHistory();
    if (
        !CookieService.get('access_token')
    ) {
        history.push('/');
    }

    return (

        <>

        </>

    )

}


