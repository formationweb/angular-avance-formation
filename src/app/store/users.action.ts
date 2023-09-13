export class GetUsersAction {
    static readonly type = '[User] Get All'

    constructor(public sort?: string) {}
}

export class CreateUserAction {
    static readonly type = '[User] Create'

    constructor(public form: { email: string, name: string, username: string }) {}
}

export class DeleteUserAction {
    static readonly type = '[User] Delete'

    constructor(public userId: number) {}
}