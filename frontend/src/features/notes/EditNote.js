import EditNoteForm from './EditNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useAuth from '../../hooks/useAuth'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useParams } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'

const EditNote = () => {
    useTitle('techNotes: Edit Note')

    const { id } = useParams()
    // we need to know who the user is, so we can determine if they have access to edit this note. We get that from our useAuth custom hook.
    const { username, isManager, isAdmin } = useAuth()


    // RTK Query cache, we are going to use the useGetNotesQuery hook to get the notes from the cache. We are going to use the selectFromResult option to get the specific note we want to edit.
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditNoteForm note={note} users={users} />

    return content
}
export default EditNote