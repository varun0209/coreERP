import { NgModule } from '@angular/core';
import { LoginComponent, NotFoundComponent, SidebarComponent, DashboardComponent, SettingComponent } from '../components/index';


@NgModule({
    declarations: [
        LoginComponent,
        NotFoundComponent,
        SidebarComponent,
        DashboardComponent,
        SettingComponent,
    ],
    exports: [
        LoginComponent,
        NotFoundComponent,
        SidebarComponent,
        DashboardComponent,
        SettingComponent,
    ]

})

export class SharedComponentsModule { }
