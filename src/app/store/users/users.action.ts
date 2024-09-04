export class UsersGetAllAction {
    static type = '[User] Get All'

    constructor(public sort?: string) {}
}

export class UserCreateAction {
    static type = '[User] Create'

    constructor(public form: { email: string, name: string }) {}
}