export class GetUsersAction {
    static readonly type = '[User] Get All'

    constructor(public sort?: string) {}
}