import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/auth_slice";

export const ShowIfLoggedIn = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <>{children}</>
    } 
    return null
}

export const ShowIfLoggedOut = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <>{children}</>
    } 
    return null
}