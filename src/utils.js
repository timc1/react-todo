export const getRandomHash = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5)

export const formatDate = date => {
  const d = new Date(date)

  if (d.toString().toUpperCase() !== 'INVALID DATE') {
    return `${d
      .toDateString()
      .split(' ')
      .splice(0, 4)
      .join(' ')}`
  } else {
    return null
  }
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
export const debounce = (func, wait, immediate) => {
  var timeout, args, context, timestamp, result
  if (null == wait) wait = 100

  function later() {
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  var debounced = function() {
    context = this
    args = arguments
    timestamp = Date.now()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args)
      context = args = null

      clearTimeout(timeout)
      timeout = null
    }
  }

  return debounced
}

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.tcc.im'
    : 'http://localhost:8888'

const httpAttributes = {
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'include', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
}

export const http = {
  post: (url = ``, data = {}) => {
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      ...httpAttributes,
    })
      .then(response => response.json())
      .catch(error => ({ error: 'connection error' }))
  },
  get: (url = ``, data = {}) => {
    return fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      ...httpAttributes,
    })
      .then(response => response.json())
      .catch(error => ({
        error: 'connection error',
      }))
  },
  delete: (url = ``) => {
    return fetch(url, {
      method: 'DELETE',
      ...httpAttributes,
    })
      .then(response => response.json())
      .catch(error => ({ error: 'connection error' }))
  },
}
