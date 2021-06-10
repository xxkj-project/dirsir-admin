/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-11 10:50:54
 * @Desc: token、username等用户认证信息，localStrong本地存储
 */
import storage from './storage'

// token存取----------------------------------------------
const TokenKey = 'ds_key'
// const TokenKey = 'Admin-Token'
// token过期时间 (小时)
const TokenExpire = 24

export function getToken() {
  return storage.getItem(TokenKey)
}

export function setToken(token) {
  storage.setItem(TokenKey, token, TokenExpire)
}

export function removeToken() {
  storage.removeItem(TokenKey)
}

// username存取------------------------------------------
const UsernameKey = 'ds_username'

export function getUsername() {
  return storage.getItem(UsernameKey)
}

export function setUsername(username) {
  storage.setItem(UsernameKey, username)
}

export function removeUsername() {
  storage.removeItem(UsernameKey)
}

// password存储(TODO: 只在测试服存储，正式服不作存储，若要存储需要设置一个过期时间)------------------------------------------------
const Password = 'ds_password'

export function getPassword() {
  return storage.getItem(Password)
}

export function setPassword(pwd) {
  storage.setItem(Password, pwd)
}

export function removePassword() {
  storage.removeItem(Password)
}

// 公会id存取 TODO: 需要去掉---------------------------------------------

const GuildId = 'ds_guildId'

export function getGuildId() {
  return storage.getItem(GuildId)
}

export function setGuildId(username) {
  storage.setItem(GuildId, username)
}

export function removeGuildId() {
  storage.removeItem(GuildId)
}
