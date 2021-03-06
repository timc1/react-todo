import { http, API_URL } from '../../../../utils'

// This is a helper function which is called inside of useTodo hook.
// When a user is present, this function will be called on their respective actions.
// Instead of saving to localStorage, we save all data in our database.

const url = API_URL + '/v0/todos'
export const saveToDB = body => {
  return new Promise(async resolve => {
    const { error, data } = await http.put(url, body)
    resolve({ error, data })
  })
}
