import * as mongoose from 'mongoose'
export const UserSchema = new mongoose.Schema({
    username: String,
    password : String,
    token: String
})

export interface User {
    id: string
    username: string
    password : string
    token: string
}
