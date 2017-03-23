import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './errors/error.404.component';
import { LayoutComponent } from './layout/layout.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
   {
      path: '', component: LayoutComponent, children: [
         // Main redirection
         { path: '', redirectTo: 'main', pathMatch: 'full' },
         // Redirections of main sections
         { path: 'styleguide', redirectTo: 'styleguide/colors', pathMatch: 'full' },
         { path: 'components', redirectTo: 'components/buttons/button', pathMatch: 'full' },
         { path: 'services', redirectTo: 'services/regexp', pathMatch: 'full' },
         // { path: 'pipes', redirectTo: 'pipes/filter', pathMatch: 'full' },

         // redirection of components
         { path: 'components/buttons', redirectTo: 'components/buttons/button', pathMatch: 'full' },
         { path: 'components/feedback', redirectTo: 'components/feedback/spinner', pathMatch: 'full' },
         { path: 'components/forms', redirectTo: 'components/forms/input', pathMatch: 'full' },
         { path: 'components/info', redirectTo: 'components/info/box', pathMatch: 'full' },
         { path: 'components/navigation', redirectTo: 'components/navigation/dropdown', pathMatch: 'full' },

         // ************** LAZY LOAD MODULES ********************
         { path: 'main', loadChildren: './+others/main/main.module#MainModule' },
         { path: 'changelog', loadChildren: './+others/changelog/changelog.module#ChangelogModule' },

         // styleguide
         { path: 'styleguide/colors', loadChildren: './+styleguide/colors/colors.module#ColorsModule' },
         { path: 'styleguide/grid', loadChildren: './+styleguide/grid/grid.module#GridModule' },
         { path: 'styleguide/icons', loadChildren: './+styleguide/icons/icons.module#IconsModule' },
         { path: 'styleguide/typography', loadChildren: './+styleguide/typography/typography.module#TypographyModule' },


         // Components modules
         // **** buttons
         { path: 'components/buttons/button', loadChildren: './+components/button/button.module#ButtonModule' },
         { path: 'components/buttons/toggle', loadChildren: './+components/toggle-button/toggle-button.module#ToggleButtonModule' },
         // **** feedback
         { path: 'components/feedback/spinner', loadChildren: './+components/spinner/spinner.module#SpinnerModule' },
         // **** form
         { path: 'components/forms/input', loadChildren: './+components/input/input.module#InputModule' },
         // **** info
         { path: 'components/info/box', loadChildren: './+components/info-box/info-box.module#InfoBoxModule' },
         { path: 'components/info/card', loadChildren: './+components/info-card/info-card.module#InfoCardModule' },
         // **** navigation
         { path: 'components/navigation/dropdown', loadChildren: './+components/dropdown/dropdown.module#DropdownModule' },
         { path: 'components/navigation/dropdown-menu', loadChildren: './+components/dropdown-menu/dropdown-menu.module#DropdownMenuModule' },
         { path: 'components/navigation/footer', loadChildren: './+components/footer/footer.module#FooterModule' },
         { path: 'components/navigation/header', loadChildren: './+components/header/header.module#HeaderModule' },
         { path: 'components/navigation/page-title', loadChildren: './+components/page-title/page-title.module#PageTitleModule' },
         { path: 'components/navigation/pagination', loadChildren: './+components/pagination/pagination.module#PaginationModule' },
         { path: 'components/navigation/radio-menu', loadChildren: './+components/radio-menu/radio-menu.module#RadioMenuModule' },
         { path: 'components/navigation/tab-box', loadChildren: './+components/tab-box/tab-box.module#TabBoxModule' },
         { path: 'components/navigation/tabs-horizontal', loadChildren: './+components/tabs-horizontal/tabs-horizontal.module#TabsHorizontalModule' },
         { path: 'components/navigation/tabs-vertical', loadChildren: './+components/tabs-vertical/tabs-vertical.module#TabsVerticalModule' },
         // **** tooltip
         { path: 'components/tooltip', loadChildren: './+components/tooltip/tooltip.module#TooltipModule' },
         // **** search
         { path: 'components/search', loadChildren: './+components/search/search.module#SearchModule' },

         // Services modules
         { path: 'services/regexp', loadChildren: './+services/regexp/regexp.module#RegexpModule' },

         // ********** PENDING OF REFACTOR AND HIDE *****
         // **** two-list-selection
         { path: 'components/two-list', loadChildren: './+components/two-list-selection/two-list-selection.module#TwoListSelectionModule' },
         // **** modals
         { path: 'components/modal', loadChildren: './+components/modal/modal.module#ModalModule' }

      ]
   },

   { path: '**', component: Error404Component }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });