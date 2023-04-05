import { User } from "src/app/core/interfaces/user"

export class GetUsersAction {
    static readonly type = '[User] Get All'

    constructor(public sort?: string) {}
}

export class CreateUserAction {
    static readonly type = '[User] Create User'

    constructor(public form: Omit<User, 'id'>) {}
}

export class DeleteUserAction {
    static readonly type = '[User] Delete'

    constructor(public id: number) {}
}