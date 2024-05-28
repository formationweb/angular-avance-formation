export class GetUsersAction {
    static readonly type = '[Users] Get Users'

    constructor(public sort?: string) {}
}