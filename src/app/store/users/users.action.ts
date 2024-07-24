import { UserPayload } from "../../core/services/user.service"

export class GetUsersAction {
    static readonly type = '[Users] Get All'

    constructor(public sort?: string) {}
}

export class CreateUserAction {
    static readonly type = '[Users] Create'

    constructor(public payload: UserPayload) {}
}