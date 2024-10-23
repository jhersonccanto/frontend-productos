import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarModule,ButtonModule,AvatarModule,AvatarGroupModule,StyleClassModule,RippleModule,RouterLink,CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
