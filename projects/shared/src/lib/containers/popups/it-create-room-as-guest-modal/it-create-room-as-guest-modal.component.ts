import { ChangeDetectorRef, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { PopupService } from "projects/shared/src/lib/logic/services/helper/popup.service";
import { filter, firstValueFrom, take } from "rxjs";
import { AuthenticationActions, AuthenticationState, CreateRoomFormData, ProfileEditorFormData } from "@shared";
import { RoomActions } from "projects/app/src/app/core/state";

@Component({
  selector: 'it-create-room-as-guest-modal',
  templateUrl: './it-create-room-as-guest-modal.component.html'
})
export class ItCreateRoomAsGuestModal {
  stepIndex: number = 0;

  profileFormData: ProfileEditorFormData;

  createRoomFormData: CreateRoomFormData;

  constructor(
    private popupService: PopupService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) { }

  close() {
    this.popupService.dismissModal();
  }

  setProfileFormData(profileFormData: ProfileEditorFormData) {
    let initialSet = !!!this.profileFormData;
    this.profileFormData = profileFormData;
    if (initialSet) this.changeDetectorRef.detectChanges();
  }

  setCreateRoomFormData(formData: CreateRoomFormData) {
    this.createRoomFormData = formData;
  }

  formInvalid() {
    switch (this.stepIndex) {
      case 0: {
        return !!!this.profileFormData || !this.profileFormData.valid;
      };
      case 1: {
        return !!!this.createRoomFormData || !this.createRoomFormData.valid;
      }
    }
    return false;
  }

  goBack() {
    this.stepIndex -= 1;
    this.changeDetectorRef.detectChanges();
  }

  goForward() {
    if (this.formInvalid()) return;
    switch (this.stepIndex) {
      case 0: {
        this.stepIndex += 1;
        this.changeDetectorRef.detectChanges();
      } break;
      case 1: {
        this.store.dispatch(new AuthenticationActions.SignUpUser(
          {
            register: false,
            email: "",
            password: "",
            valid: true
          },
          this.profileFormData)
        );

        firstValueFrom(this.store.select(AuthenticationState.user)
          .pipe(
            filter(u => !!u),
            take(1)
          ))
          .then(() => {
            return firstValueFrom(this.store.dispatch(new RoomActions.CreateRoom(
              this.createRoomFormData.name,
              this.createRoomFormData.description
            )));
          }
        ).then(state => {
          this.popupService.dismissModal({
            userId: state?.authentication?.user?.id,
            roomId: state?.authentication?.user?.roomId
          });
        });
      }
    }
  }
}