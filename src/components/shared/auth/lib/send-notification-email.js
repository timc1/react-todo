import { http, API_URL } from '../../../../utils'

export default (user, error) => {
  const url = API_URL + '/email'
  const body = error
    ? {
        from: `User signup error: ${error.message}`,
        to: `timchang.tcc@gmail.com`,
        subject: `User signup error: ${error.message}`,
        text: ``,
        html: ``,
      }
    : {
        from: `New todoHQ user signup! <${user.first_name} ${user.last_name}>`,
        to: `timchang.tcc@gmail.com`,
        subject: `New todoHQ user signup! <${user.first_name} ${
          user.last_name
        }>`,
        text: ``,
        html: ``,
      }

  console.log('body', body)

  http.post(url, body).then(res => console.log('email response', res))
}
