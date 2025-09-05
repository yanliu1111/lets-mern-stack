# 📓 Busy Bee🐝techNotes – Secure Employee Notes & Task Management System

**Project Summary:**
techNotes is a web-based replacement for traditional sticky notes, designed to streamline task and note management in a workplace setting. The system provides role-based access for Employees, Managers, and Admins, ensuring secure handling of tasks through authentication and weekly login requirements. Notes are tracked with ticket numbers, titles, and timestamps, and can only be deleted by Managers or Admins. Employees manage their own assigned notes, while Managers and Admins oversee all notes and user settings. The platform emphasizes security, role clarity, and quick removal of employee access when needed, with a responsive design that supports both desktop and mobile use.

## 🎯 User Stories for techNotes

1. [x] Replace current sticky note system
2. [x] Add a public facing page with basic contact info 
3. [x] Add an employee login to the notes app 
4. [x] Provide a welcome page after login 
5. [x] Provide easy navigation
6. [x] Display current user and assigned role 
7. [x] Provide a logout option 
8. [x] Require users to login at least once per week
9. [x] Provide a way to remove employee access asap if needed 
10. [x] Notes are assigned to specific employees 
11. [x] **Notes** have a ticket #, title, note body, created & updated dates
12. [x] Notes are either OPEN or COMPLETED 
13. [x] Users can be 🙋‍♂️Employees, 🙎‍♀️Managers, or 👨Admins 
14. [x] Notes can **only be deleted by Managers or Admins** 
15. [x] **Anyone can create** a note (when customer checks-in)
16. [x] Employees can **only view and edit** their assigned notes  
17. [x] **Managers and Admins can view, edit, and delete** all notes 
18. [x] **Only Managers and Admins** can **access** User Settings 
19. [x] Only Managers and Admins can **create** new users 
20. [x] Desktop mode is most important but should be available in **mobile** 

## 👩‍💻 Tech Stack:
- React
- Redux Toolkit (RTK) with RTK Query
- React Router
- MongoDB with Mongoose
- Express
- Node.js (v20.10.0)
- Middleware
- Controllers
- CORS
- bcrypt for password hashing
- Authentication vs Authorization
- JWT for authentication
- Roles & Permissions

## 🧠 Case study: 
### 🎈Case 1: Extending Data Cache Duration with Prefetching in RTK Query

1. In `userApiSlice.js`, the option `keepUnusedDataFor: 5` means that when there is no active subscription to the data, it will be removed from the cache after 5 seconds.  
   - If this line is removed, the default cache duration is 60 seconds.  
   - To keep an active subscription and maintain the data in the cache for a longer period, we need to implement a prefetch strategy.

2. In `EditUser.js`, we use `useSelector` and `selectUserById` to retrieve the user data directly from the Redux store.  
   - Since we only need the cached data here, **no active subscription** to the query is required.

3. To keep the data cached for a longer period, create an `auth/Prefetch.js` component.  
   - This component maintains an active subscription to the data even when no component is directly using it.  
   - (See the implementation details in `Prefetch.js`.)

4. In `app.js`, wrap the routes for `/dash/*` with the `<Prefetch />` component.  
   - This ensures the data stays “warm” in the cache and reduces unnecessary refetching.

### 🎈Case 2: Real-Time Updates Across Multiple Users’ Screens

In this scenario, the application allows updates made in a single note form to be reflected for all listed users in real time.  
When more than one person is working with the same list of data, it’s important to have **up-to-date reference data** for any changes.

We can leverage **Redux RTK Query** to automatically re-mount and re-render components when updates occur.

#### Key Implementation Details:
- In `store.js`, `setupListeners(store.dispatch)` is configured to enable:
  - `refetchOnFocus` – refetch data when the browser window regains focus.
  - `refetchOnReconnect` – refetch data when the network reconnects.

- In `UserList.js` (similar to `NotesList.js`), configure the `useGetUsersQuery` hook to keep the data updated:

```js
const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetUsersQuery(undefined, {
    pollingInterval: 60000,            // fetch updates every 60 seconds
    refetchOnFocus: true,              // refetch on window focus
    refetchOnMountOrArgChange: true    // refetch when component remounts or args change
});
```

### 🎈Learning JWT Authentication and Authorization
- JWT is Json Web Token, access token and a refresh token
- Access token is short lived, usually 15 minutes to an hour
- Refresh token is long lived, usually a week or more
- Access token: sent as Json client stores in memory Do NOT store in local storage or cookies
- Refresh token: sent as HttpOnly cookie, not accessible from JS, Must have expiry at some point
- Access Token: Issued after Authentication, Client uses for API Access until expires, Verified with Middleware, New token issued with Refresh Token
- Refresh Token: Issued along with Access Token, Sent as HttpOnly cookie, Used to obtain new Access Token when expired, Verified with Middleware

### 🎈Case 3: RTK Query cache helps refactor
We are going to use the `useGetNotesQuery` hook to get the notes from the cache. We are going to use the selectFromResult option to get the specific note we want to edit. Refactor in `Note.js` and `EditNote.js`, same as User
```js
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })
```

Example
username:
password:
role:

| username | password | role      |
|----------|----------|-----------|
| Lily     | test234  | Admin     |
| lulu     | test123  | Employee  |
| Dave     | test123  | Manager   |


### 🚀Keep coding keep learning!

