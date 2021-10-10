import * as mongoose from 'mongoose'

export const DistrictSchema = new mongoose.Schema({
    districtid: String,
    name: String,
    provinceid:String,
})
export interface District  {
    districtid: string
    name: string
    provinceid:string
}
