import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "catalog", component: CatalogComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
