import { API_URL } from '../../../../utils'

export default (user, error, additionalMessage) => {
  const url = API_URL + '/email'
  const body = error
    ? {
        from: `User signin error: ${error.message}`,
        to: `timchang.tcc@gmail.com`,
        subject: `User signin error: ${error.message}`,
        text: ``,
        html: ``,
      }
    : {
        from: `todoHQ user signin! <${user.first_name} ${user.last_name}>`,
        to: `timchang.tcc@gmail.com`,
        subject: `todoHQ user signin! <${user.first_name} ${user.last_name}>`,
        text: ``,
        html: `<p>Additional message: ${additionalMessage}</p>`,
      }

  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(body), // body data type must match "Content-Type" header
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => response.json())
    .catch(error => ({ error: 'connection error' }))
}
