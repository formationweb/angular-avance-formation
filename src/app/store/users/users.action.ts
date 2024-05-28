import { UserCreatePayload } from "../../core/services/user.service"

export class GetUsersAction {
    static readonly type = '[Users] Get Users'

    constructor(public sort?: string) {}
}

export class CreateUsersAction {
    static readonly type = '[Users] Create User'

    constructor(public formValue: UserCreatePayload) {}
}