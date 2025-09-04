import { Outlet } from 'react-router-dom';
import { notesApiSlice } from '../notes/notesApiSlice'
import { store } from '../../app/store'
import { useEffect } from 'react';
import { usersApiSlice } from '../users/usersApiSlice';

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])
    return <Outlet /> // render child routes, all child wrap our protected pages in this pre-fetch component. help when we refresh the page, we still want to have that state including pre-filling our form. That is why we use this pre-fetch component.
}
export default Prefetch

//useEffect runs once when the component mounts, when it mounts we are going too log subscribing, react 18 use strict mode, so it going to mount unmount and remount. We ll see that with a subscribing unsubscribing and once again subscribing and that's only in strick mode when you are in development.
