import types from './types';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';
const API_GROUPS_JOINED = '/api/groups/joined/';
const API_GROUPS_CREATED = '/api/groups/created/';
const API_GROUPS = '/api/groups';
const API_LOGIN = '/api/login';
const API_USER = '/api/users/';
const API_EDIT_USER = '/api/users';
const API_EDIT_GROUP_INFO = '/api/groups/';
const API_GET_GROUP_DETAILS = '/api/groups/details';
const API_NEW_ACCOUNT = '/api/users';
const API_JOIN_GROUP = '/api/groups/join';
const API_USERNAME = '/api/users/username';
const API_EMAIL = '/api/users/email';
const API_GROUP_NAME = '/api/groups/name';
const API_FILTER_GROUPS = '/api/groups/filter/';
const API_LEAVE_GROUP = '/api/groups/leave';
axios.defaults.withCredentials = true;

export function filterResults(value){
   const resp = axios.get(BASE_URL + API_FILTER_GROUPS + value);
   return {
      type: types.FILTER_RESULTS,
      payload: resp
   }
}

export function getCreatedGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS_CREATED);
   return {
      type: types.GET_CREATED_GROUPS,
      payload: resp
   }
}

export function getJoinedGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS_JOINED);
   return {
      type: types.GET_JOINED_GROUPS,
      payload: resp
   }
}

export function getUserInfo() {
   return async function (dispatch) {
      const resp = await axios.get(BASE_URL + API_USER);
      dispatch({
         type: types.GET_USER_INFO,
         payload: resp,
      })
   }
}

export function editUserInfo(item) {
   const resp = axios.put(BASE_URL + API_EDIT_USER, item)
   return {
      type: types.EDIT_USER_INFO,
      payload: resp,
   }
}

export function createNewGroup(item) {
   return async function (dispatch) {
      const validGroupName = await axios.get(`${BASE_URL + API_GROUP_NAME}/${item.name}`)
      console.log(validGroupName)
      if (!validGroupName.data) {
         const resp = await axios.post(BASE_URL + API_GROUPS, item)
         const getGroup = await axios.get(`${BASE_URL + API_GET_GROUP_DETAILS}/${item.name}`)
         const groupInfo = { group_id: getGroup.data.id, user_id: getGroup.data.user_id }
         const addUserToGroup = await axios.post(BASE_URL + API_JOIN_GROUP, groupInfo);
         dispatch({
            type: types.VALID_GROUPNAME,
            payload: resp
         })
      } else {
         dispatch({
            type: types.GROUPNAME_ALREADY_EXIST,
            error: 'Group name already in use'
         })
      }
   }
}

export function loginApp(item) {
   return async function (dispatch) {
      const resp = await axios.post(BASE_URL + API_LOGIN, item);
      console.log(resp)
      if (resp.data.success) {
         localStorage.setItem('token', resp.data.success)
         console.log(resp)
         dispatch({
            type: types.LOGIN_APP,
            payload: resp
         })
      } else {
         dispatch({
            type: types.ERROR_LOGIN,
            error: 'Invalid email or password'
         })
      }
   }

}

export function getAllGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS);
   return {
      type: types.GET_ALL_GROUPS,
      payload: resp
   }
}

export function getGroupDetails(groupId) {
   const resp = axios.get(`${BASE_URL + API_GET_GROUP_DETAILS}/${groupId}`);
   return {
      type: types.GET_GROUP_DETAILS,
      payload: resp
   }
}

export function editGroupInfo(groupId, item) {
   const resp = axios.put(`${BASE_URL + API_EDIT_GROUP_INFO}${groupId}`, item);
   return {
      type: types.EDIT_GROUP_INFO,
      payload: resp
   }
}

export function createAccount(item) {
   return async function (dispatch) {
      const validEmail = await axios.get(`${BASE_URL + API_EMAIL}/${item.email}`)
      const validUsername = await axios.get(`${BASE_URL + API_USERNAME}/${item.username}`)
      if (!validEmail.data && !validUsername.data) {
         const resp = await axios.post(BASE_URL + API_NEW_ACCOUNT, item)
         localStorage.setItem('token', resp.data.success)
         dispatch({
            type: types.CREATE_ACCOUNT,
            payload: resp
         })
      } else if (validEmail.data && !validUsername.data) {
         dispatch({
            type: types.EMAIL_ALREADY_EXISTS,
            error: 'Email already in use'
         })
      } else if (validUsername.data && !validEmail.data) {
         dispatch({
            type: types.USERNAME_ALREADY_EXISTS,
            error: 'Username already in use'
         })
      } else {
         dispatch({
            type: types.USERNAME_AND_EMAIL_EXIST
         })
      }
   }
}

export function joinGroup(groupId) {
   const resp = axios.post(BASE_URL + API_JOIN_GROUP, { group_id: groupId });
   console.log(resp);
   return {
      type: types.JOIN_GROUP,
      payload: resp
   }
}

export function userSignOut(){
   localStorage.removeItem('token');

   return {
      type: types.SIGN_OUT
   }
}

export function leaveGroup(groupId){
   const config = {
      data: {
         group_id: groupId
      }
   };
   const resp = axios.delete(BASE_URL + API_LEAVE_GROUP, config)
      return {
         type: types.LEAVE_GROUP,
      
   }
}

export function deleteGroup(groupId){
   const config = {
      data: {
         group_id: groupId
      }
   }
   const resp = axios.delete(BASE_URL + API_GROUPS, config)
      return {
         type: types.DELETE_GROUP,
         payload: resp
      }
}