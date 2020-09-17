import { StorageService } from './storage/storage.service';
import { Injectable } from '@angular/core'; 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CheckUserType implements CanActivate  {
    constructor(private storage: StorageService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
		const data = this.storage.getData()
		const token = data['token'];
		const decoded = jwt_decode(token);
		 
		 if (decoded.rol === 'ADMIN'){
			 if(state.url === '/user-dashboard' || state.url === '/user-dashboard/user-video-detail' 
			 		|| state.url.includes('/user-dashboard/')){
				this.router.navigate(['/dashboard']);
			 	return false
			}
			return true;			
		}
		else {
			if(state.url === '/dashboard' || state.url.includes('/dashboard')){
				this.router.navigate(['/user-dashboard']);
			 	return false
			}
 			return true;
		}
	}     
}