export class UsersGetAllAction {
    static type = '[User] Get All'

    constructor(public sort?: string) {}
}