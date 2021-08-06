import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RegisterSalonServiceComponent } from './register-salon-service/register-salon-service.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AdminRoutingModule } from './admin.routing.module';
import { NavComponent } from '../../public/nav/nav.component';



@NgModule({
  declarations: [RegisterSalonServiceComponent, ListScheduleComponent, NavComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [NavComponent]
})
export class AdminModule {

  static forRoot(): ModuleWithProviders<AdminModule> {
    return {
      ngModule: AdminModule,
      providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
      ]
    }
  }
}
