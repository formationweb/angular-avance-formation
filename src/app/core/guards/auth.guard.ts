import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard = (): boolean => {
    const auth = inject(AuthService)
    const router = inject(Router)

    if (!auth.token) {
        router.navigateByUrl('/login')
        return false
    }

    return true
}