import { ObjectId } from "mongodb"
export interface rowData {
    _id: ObjectId,
    teamId: ObjectId,
    teamName: string,
    updateAt: Date,
    createdAt: Date,
    status: number,
    content: string
}