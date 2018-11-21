import { formatDate } from '../utils'

export const User = data => {
  if (data) {
    return {
      id: data.id || null,
      general: {
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      },
      contact: {
        email: data.email || '',
      },
      created_at: data.created_at ? formatDate(data.created_at) : null,
    }
  }
  return null
}
