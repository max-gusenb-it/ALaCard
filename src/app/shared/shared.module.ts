import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItButtonComponent } from './components/buttons/it-button/it-button.component';
import { ControlValueAccessorDirective } from './directives/control-value-accessor.directive';
import { ItInputComponent } from './components/inputs/it-input/it-input.component';
import { ItIconButtonComponent } from './components/buttons/it-icon-button/it-icon-button.component';
import { ItIconComponent } from './components/display/it-icon/it-icon.component';
import { ItSelectComponent } from './components/inputs/it-select/it-select.component';
import { ItTextAreaComponent } from './components/inputs/it-text-area/it-text-area.component';
import { ItNavigationComponent } from './components/buttons/it-navigation/it-navigation.component';
import { ItNavItemComponent } from './components/buttons/it-navigation/it-nav-item/it-nav-item.component';
import { ItCheckboxComponent } from './components/inputs/it-checkbox/it-checkbox.component';
import { ItDetailHeadingComponent } from './components/headings/it-detail-heading/it-detail-heading.component';
import { ItButtonHeadingComponent } from './components/headings/it-button-heading/it-button-heading.component';
import { ItCheckboxHeadingComponent } from './components/headings/it-checkbox-heading/it-checkbox-heading.component';
import { ItDrawingBoardComponent } from './components/inputs/it-drawing-board/it-drawing-board.component';
import { ItMenuButtonComponent } from './components/buttons/it-menu-button/it-menu-button.component';
import { ItSnackbarComponent } from './components/display/it-snackbar/it-snackbar.component';
import { ExampleComponent } from './components/display/example/example.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ItAccordComponent } from './components/display/it-accord/it-accord.component';
import { ItTabGroupComponent } from './components/display/it-tab-group/it-tab-group.component';
import { ItTabComponent } from './components/display/it-tab/it-tab.component';
import { ItChipComponent } from './components/buttons/it-chip/it-chip.component';
import { ItDeckComponent } from './components/buttons/it-deck/it-deck.component';
import { ItSelectionListComponent } from './components/display/it-selection-list/it-selection-list.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ItProfileEditorComponent } from './components/forms/it-profile-editor/it-profile-editor.component';
import { FireDatePipe } from './pipes/fire-date.pipe';
import { ItPlayerComponent } from './components/display/it-player/it-player.component';
import { ItOptionDialog } from './components/forms/it-option-dialog/it-option-dialog.component';
import { ItForgotPasswordDialog } from './components/forms/it-forgot-password-dialog/it-forgot-password-dialog.component';
import { ItSignInDialog } from './components/forms/it-sign-in-dialog/it-sign-in-dialog.component';
import { ItSignUpDialog } from './components/forms/it-sign-up-dialog/it-sign-up-dialog.component';
import { CreateAccountComponent } from './components/forms/it-sign-up-dialog/create-account/create-account.component';
import { ItAuthenticateDialog } from './components/forms/it-authenticate-dialog/it-authenticate-dialog.component';

@NgModule({
  declarations: [
    ControlValueAccessorDirective,
    ItButtonComponent,
    ItChipComponent,
    ItDeckComponent,
    ItIconButtonComponent,
    ItMenuButtonComponent,
    ItNavigationComponent,
    ItNavItemComponent,
    ItAccordComponent,
    ItIconComponent,
    ItPlayerComponent,
    ItSelectionListComponent,
    ItSnackbarComponent,
    ItTabComponent,
    ItTabGroupComponent,
    ItAuthenticateDialog,
    ItForgotPasswordDialog,
    ItOptionDialog,
    ItProfileEditorComponent,
    ItSignInDialog,
    ItSignUpDialog,
    CreateAccountComponent,
    ItButtonHeadingComponent,
    ItCheckboxHeadingComponent,
    ItDetailHeadingComponent,
    ItCheckboxComponent,
    ItDrawingBoardComponent,
    ItInputComponent,
    ItSelectComponent,
    ItTextAreaComponent,
    ExampleComponent,
    FireDatePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    IonicModule.forRoot(),
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ItButtonComponent,
    ItChipComponent,
    ItDeckComponent,
    ItIconButtonComponent,
    ItMenuButtonComponent,
    ItNavigationComponent,
    ItNavItemComponent,
    ItAccordComponent,
    ItIconComponent,
    ItPlayerComponent,
    ItSelectionListComponent,
    ItSnackbarComponent,
    ItTabComponent,
    ItTabGroupComponent,
    ItAuthenticateDialog,
    ItForgotPasswordDialog,
    ItOptionDialog,
    ItProfileEditorComponent,
    ItSignInDialog,
    ItSignUpDialog,
    CreateAccountComponent,
    ItButtonHeadingComponent,
    ItCheckboxHeadingComponent,
    ItDetailHeadingComponent,
    ItCheckboxComponent,
    ItDrawingBoardComponent,
    ItInputComponent,
    ItSelectComponent,
    ItTextAreaComponent,
    ExampleComponent,
    FireDatePipe
  ],
  providers: [
  ]
})
export class SharedModule { }
