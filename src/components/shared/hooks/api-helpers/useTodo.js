import { http, API_URL } from '../../../../utils'

// This is a helper function which is called inside of useTodo hook.
// When a user is present, this function will be called on their respective actions.
// Instead of saving to localStorage, we save all data in our database.

export const saveToDB = body => {
  console.log('body', body)
}
