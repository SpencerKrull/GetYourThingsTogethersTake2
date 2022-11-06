import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EntryList from "../../components/entry/entryList/EntryList";
import EntrySummary from "../../components/entry/entrySummary/EntrySummary";
import useRedirectLogout from "../../customhook/useRedirectLogout";
import { selectIsLoggedIn } from "../../redux/features/auth/auth_slice";
import { getEntries } from "../../redux/features/entries/entry_slice";

const Dash = () => {
    useRedirectLogout('/login')
    const dispatch = useDispatch()

        const isLoggedIn = useSelector(selectIsLoggedIn)
        const {entries, isLoading, isError, message} = useSelector((state) => state.entry)

        useEffect(() => {
            if (isLoggedIn === true) {
                dispatch(getEntries)
            }
            console.log(entries)
            if(isError) {
                console.log(message)
            }
        }, [isLoggedIn, isError, message, dispatch, entries])

    return (
        <div>
            <EntrySummary entries={entries} />
            <EntryList entries={entries} isLoading={isLoading} />
        </div>
    )
}

export default Dash