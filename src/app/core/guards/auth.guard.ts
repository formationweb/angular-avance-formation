import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export function authGuard(): boolean {
    const auth = inject(AuthService)
    const router = inject(Router)
    const token = auth.token

    if (!token) {
        router.navigateByUrl('/login')
        return false
    }
    
    return true
}