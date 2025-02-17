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
import { ItProfileEditorComponent } from './components/forms/it-profile-editor-form/it-profile-editor-form.component';
import { FireDatePipe } from './pipes/fire-date.pipe';
import { ItPlayerComponent } from './components/display/it-player/it-player.component';
import { ItOptionBottomSheet } from './components/forms/it-option-bottom-sheet/it-option-bottom-sheet.component';
import { ItForgotPasswordModal } from './components/forms/it-forgot-password-modal/it-forgot-password-modal.component';
import { ItSignInModal } from './components/forms/it-sign-in-modal/it-sign-in-modal.component';
import { ItSignUpModal } from './components/forms/it-sign-up-modal/it-sign-up-modal.component';
import { ItCreateAccountComponent } from './components/forms/it-create-account/it-create-account.component';
import { ItAuthenticateModal } from './components/forms/it-authenticate-modal/it-authenticate-modal.component';
import { ItAddAccountModal } from './components/forms/it-add-account-modal/it-add-account-modal.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ItCreateRoomAsGuestModal } from './components/forms/it-create-room-as-guest-modal/it-create-room-as-guest-modal.component';
import { ItCreateRoomForm } from './components/forms/it-create-room-form/it-create-room-form.component';
import { ItCheckboxAccordComponent } from './components/inputs/it-checkbox-accord/it-checkbox-accord.component';
import { ItResultComponent } from './components/display/it-result/it-result.component';
import { ItLoadingScreenComponent } from './components/display/it-loading-screen/it-loading-screen.component';
import { ItSipResultComponent } from './components/display/it-sip-result/it-sip-result.component';
import { ItSipResultsComponent } from './components/display/it-sip-results/it-sip-results.component';

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
    ItLoadingScreenComponent,
    ItPlayerComponent,
    ItResultComponent,
    ItSelectionListComponent,
    ItSipResultComponent,
    ItSipResultsComponent,
    ItSnackbarComponent,
    ItTabComponent,
    ItTabGroupComponent,
    ItAddAccountModal,
    ItAuthenticateModal,
    ItForgotPasswordModal,
    ItOptionBottomSheet,
    ItProfileEditorComponent,
    ItSignInModal,
    ItSignUpModal,
    ItCreateAccountComponent,
    ItCreateRoomAsGuestModal,
    ItCreateRoomForm,
    ItButtonHeadingComponent,
    ItCheckboxHeadingComponent,
    ItDetailHeadingComponent,
    ItCheckboxComponent,
    ItCheckboxAccordComponent,
    ItDrawingBoardComponent,
    ItInputComponent,
    ItSelectComponent,
    ItTextAreaComponent,
    ExampleComponent,
    FireDatePipe,
    MarkdownPipe
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
    ItLoadingScreenComponent,
    ItPlayerComponent,
    ItResultComponent,
    ItSelectionListComponent,
    ItSipResultComponent,
    ItSipResultsComponent,
    ItSnackbarComponent,
    ItTabComponent,
    ItTabGroupComponent,
    ItAddAccountModal,
    ItAuthenticateModal,
    ItForgotPasswordModal,
    ItOptionBottomSheet,
    ItProfileEditorComponent,
    ItSignInModal,
    ItSignUpModal,
    ItCreateAccountComponent,
    ItCreateRoomAsGuestModal,
    ItCreateRoomForm,
    ItButtonHeadingComponent,
    ItCheckboxHeadingComponent,
    ItDetailHeadingComponent,
    ItCheckboxComponent,
    ItCheckboxAccordComponent,
    ItDrawingBoardComponent,
    ItInputComponent,
    ItSelectComponent,
    ItTextAreaComponent,
    ExampleComponent,
    FireDatePipe,
    MarkdownPipe
  ],
  providers: [
  ]
})
export class SharedModule { }
