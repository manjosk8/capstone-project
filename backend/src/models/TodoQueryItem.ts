export interface TodoQueryItem {
    todoId: string
    createdAt: string
    name: string
    dueDate: string
    done: boolean
    attachmentUrl?: string
}
