export const host = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = `api/auth`
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-user`
export const UPDATE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/update-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`


export const CONTACT_ROUTES = `api/contact`
export const SEARCH_CONTACT = `${CONTACT_ROUTES}/search-contact`