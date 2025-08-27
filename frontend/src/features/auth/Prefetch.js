import { Outlet } from 'react-router-dom';
import { notesApiSlice } from '../notes/notesApiSlice'
import { store } from '../../app/store'
import { useEffect } from 'react';
import { usersApiSlice } from '../users/usersApiSlice';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()) // create manual subscription for notes and users
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
// that way we have access to that state and it will note expire in 5 or 60 sceonds which is default
        return () => {
            console.log('unsubscribing') // then we unsubscribe when the component unmounts, leave the pages
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet /> // render child routes, all child wrap our protected pages in this pre-fetch component. help when we refresh the page, we still want to have that state including pre-filling our form. That is why we use this pre-fetch component.
}
export default Prefetch

//useEffect runs once when the component mounts, when it mounts we are going too log subscribing, react 18 use strict mode, so it going to mount unmount and remount. We ll see that with a subscribing unsubscribing and once again subscribing and that's only in strick mode when you are in development.
