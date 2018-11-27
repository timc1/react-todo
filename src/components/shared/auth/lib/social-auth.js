import { http, API_URL } from '../../../../utils'

export const handleFacebookLogin = (e, { onSuccess, onError }) => {
  if (window.FB) {
    window.FB.login(
      response => {
        const { accessToken } = response.authResponse
        const url = '/me?fields=id,first_name,last_name,email'
        if (accessToken) {
          window.FB.api(url, async response => {
            const { id, first_name, last_name, email } = response

            const url = API_URL + '/v0/auth/fb'
            const body = {
              fb_access_token: accessToken,
              fb_user_id: id,
              email: email,
              first_name,
              last_name,
            }

            const { error, user } = await http.post(url, body)
            if (error) onError(error)
            else onSuccess(user)
          })
        }
      },
      { scope: 'email' }
    )
  }
}
