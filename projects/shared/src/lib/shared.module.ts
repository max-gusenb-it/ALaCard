import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';

import { MarkdownPipe } from './logic/pipes/markdown.pipe';
import { FireDatePipe } from './logic/pipes/fire-date.pipe';
import { ControlValueAccessorDirective } from './logic/directives/control-value-accessor.directive';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ItButtonComponent } from './components/buttons/it-button/it-button.component';
import { ItChipComponent } from './components/buttons/it-chip/it-chip.component';
import { ItIconButtonComponent } from './components/buttons/it-icon-button/it-icon-button.component';
import { ItMenuButtonComponent } from './components/buttons/it-menu-button/it-menu-button.component';
import { ItIconComponent } from './components/display/it-icon/it-icon.component';
import { ItDrawingBoardComponent } from './components/forms/it-drawing-board/it-drawing-board.component';
import { ItCheckboxComponent } from './components/forms/it-checkbox/it-checkbox.component';
import { ItInputComponent } from './components/forms/it-input/it-input.component';
import { ItSelectComponent } from './components/forms/it-select/it-select.component';
import { ItTextAreaComponent } from './components/forms/it-text-area/it-text-area.component';
import { ItCheckboxAccordComponent } from './components/forms/it-checkbox-accord/it-checkbox-accord.component';
import { ItAccordComponent } from './components/forms/it-accord/it-accord.component';
import { ItLoadingScreenComponent } from './containers/core/it-loading-screen/it-loading-screen.component';
import { ItSelectionListComponent } from './components/forms/it-selection-list/it-selection-list.component';
import { ItSnackbarComponent } from './containers/popups/it-snackbar/it-snackbar.component';
import { ItTabComponent } from './components/display/it-tab/it-tab.component';
import { ItTabGroupComponent } from './components/display/it-tab-group/it-tab-group.component';
import { ItForgotPasswordModal } from './containers/popups/it-forgot-password-modal/it-forgot-password-modal.component';
import { ItOptionBottomSheet } from './containers/popups/it-option-bottom-sheet/it-option-bottom-sheet.component';
import { ItProfileEditorComponent } from './containers/forms/it-profile-editor-form/it-profile-editor-form.component';
import { ItSignInModal } from './containers/popups/it-sign-in-modal/it-sign-in-modal.component';
import { ItSignUpModal } from './containers/popups/it-sign-up-modal/it-sign-up-modal.component';
import { ItCreateAccountFormComponent } from './containers/forms/it-create-account-form/it-create-account-form.component';
import { ItCreateRoomForm } from './containers/forms/it-create-room-form/it-create-room-form.component';
import { ItButtonHeadingComponent } from './components/buttons/it-button-heading/it-button-heading.component';
import { ItCheckboxHeadingComponent } from './components/forms/it-checkbox-heading/it-checkbox-heading.component';
import { ItDetailHeadingComponent } from './components/display/it-detail-heading/it-detail-heading.component';
import { ItToggleButtonComponent } from './components/buttons/it-toggle-button/it-toggle-button.component';
import { ItToggleButtonGroupComponent } from './components/buttons/it-toggle-button-group/it-toggle-button-group.component';
import { ItJoinRoomBottomSheetComponent } from './containers/popups/it-join-room-bottom-sheet/it-join-room-bottom-sheet.component';

@NgModule({
  declarations: [
    ControlValueAccessorDirective,
    MarkdownPipe,
    FireDatePipe,
    ItButtonComponent,
    ItChipComponent,
    ItIconButtonComponent,
    ItMenuButtonComponent,
    ItIconComponent,
    ItDrawingBoardComponent,
    ItCheckboxComponent,
    ItInputComponent,
    ItSelectComponent,
    ItTextAreaComponent,
    ItCheckboxAccordComponent,
    ItAccordComponent,
    ItLoadingScreenComponent,
    ItSelectionListComponent,
    ItSnackbarComponent,
    ItTabComponent,
    ItTabGroupComponent,
    ItForgotPasswordModal,
    ItOptionBottomSheet,
    ItProfileEditorComponent,
    ItSignInModal,
    ItSignUpModal,
    ItCreateAccountFormComponent,
    ItCreateRoomForm,
    ItButtonHeadingComponent,
    ItCheckboxHeadingComponent,
    ItDetailHeadingComponent,
    ItToggleButtonComponent,
    ItToggleButtonGroupComponent,
    ItJoinRoomBottomSheetComponent
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
    MarkdownPipe,
    FireDatePipe,
    ItButtonComponent,
    ItChipComponent,
    ItIconButtonComponent,
    ItMenuButtonComponent,
    ItIconComponent,
    ItDrawingBoardComponent,
    ItCheckboxComponent,
    ItInputComponent,
    ItSelectComponent,
    ItTextAreaComponent,
    ItCheckboxAccordComponent,
    ItAccordComponent,
    ItLoadingScreenComponent,
    ItSelectionListComponent,
    ItSnackbarComponent,
    ItTabComponent,
    ItTabGroupComponent,
    ItForgotPasswordModal,
    ItOptionBottomSheet,
    ItProfileEditorComponent,
    ItSignInModal,
    ItSignUpModal,
    ItCreateAccountFormComponent,
    ItCreateRoomForm,
    ItButtonHeadingComponent,
    ItCheckboxHeadingComponent,
    ItDetailHeadingComponent,
    ItToggleButtonComponent,
    ItToggleButtonGroupComponent,
    ItJoinRoomBottomSheetComponent
  ],
  providers: [
  ]
})
export class SharedModule { }