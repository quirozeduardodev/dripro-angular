import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {IonMenu, Platform} from '@ionic/angular';
import { BaseDialogComponent } from '../../../../components/dialogs/base-dialog/base-dialog.component';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import {App} from '@capacitor/app';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() subTitle: string | null = null;
  @ViewChild('ionMenu') ionMenu: IonMenu | null = null;
  @ViewChild('logoutDialog') logoutDialog: BaseDialogComponent | null = null;
  @ViewChild('changePasswordDialog') changePasswordDialog: ChangePasswordDialogComponent | null = null;
  @ViewChild('mainWrapper') mainWrapper: ElementRef | null = null;

  currentRoute: string | null = null;
  menu: { title: string; faIcon: string; route: string }[] = [
    {
      title: 'pages.dipro.layouts.drawer.menu.reports',
      faIcon: 'mdi mdi-file-document',
      route: '/reports',
    },
    {
      title: 'pages.dipro.layouts.drawer.menu.manuals',
      faIcon: 'mdi mdi-file-pdf-box',
      route: '/manuals',
    },
    {
      title: 'pages.dipro.layouts.drawer.menu.offlineData',
      faIcon: 'mdi mdi-database-arrow-down',
      route: '/offline-data',
    },
    {
      title: 'pages.dipro.layouts.drawer.menu.settings',
      faIcon: 'mdi mdi-cog',
      route: '/settings',
    },
  ];

  userSubscription: Subscription | null = null;
  mainWrapperObserver: ResizeObserver | null = null;
  backButtonSubscription: Subscription | null = null;
  appVersion: string = `${environment.appVersion}+${environment.buildVersion}`;
  constructor(private router: Router, private authService: AuthService, private _platform: Platform) {}

  ngOnInit() {
    this.matchUrl();
    this.backButtonSubscription = this._platform.backButton.subscribe(value => {
    });
  }

  ngAfterViewInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user && user.passwordChanged) {
        this.changePasswordDialog?.open();
      }
    });
  }

  ngOnDestroy(): void {
    this.mainWrapperObserver?.disconnect();
    this.userSubscription?.unsubscribe();
    this.backButtonSubscription?.unsubscribe();
  }

  matchUrl(): void {
    const paths: string[] = this.router.url.split('/');
    if (paths.length > 1) {
      this.currentRoute = `/${paths[1]}`;
    }
  }

  changePage(route: string): void {
    if (this.currentRoute === route) {
      this.ionMenu?.close();
      return;
    }
    this.router.navigate([route], { replaceUrl: true });
  }

  signOut(): void {
    this.ionMenu?.close();
    this.logoutDialog?.open();
  }

  logout(): void {
    this.logoutDialog?.close();
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
