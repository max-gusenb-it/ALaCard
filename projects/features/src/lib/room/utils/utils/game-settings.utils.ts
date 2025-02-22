import { FormGroup, Validators } from "@angular/forms";
import {
    DefaultGameSetting,
    DefaultGameSettingRequirement,
    DefaultGameSettingValueSource,
    drinkingGameSettingName,
    speficiPlayerIdSettingName
} from "@shared";

export namespace GameSettingsUtils {
    export function prepareGameSettingsForm(gameSettingsForm: FormGroup, defaultGameSettings?: DefaultGameSetting[]) {
        gameSettingsForm.patchValue({
            drinkingGame: false,
            specificPlayerActivated: false,
            specificPlayerId: null
        });

        if (!!!defaultGameSettings) defaultGameSettings = [];

        prepareSpecificPlayerIdSetting(gameSettingsForm, defaultGameSettings.find(df => df.settingName === speficiPlayerIdSettingName));
        prepareDrinkingGameSetting(gameSettingsForm, defaultGameSettings.find(df => df.settingName === drinkingGameSettingName));
    }

    export function prepareSpecificPlayerIdSetting(gameSettingsForm: FormGroup, defaultSpecificPlayerSetting?: DefaultGameSetting) {
        if (settingInputRequired(speficiPlayerIdSettingName, defaultSpecificPlayerSetting)) {
          gameSettingsForm.controls["specificPlayerId"].addValidators(Validators.required);
        } else {
          gameSettingsForm.controls["specificPlayerId"].clearValidators();
        }
        if (!settingAvailable(speficiPlayerIdSettingName, defaultSpecificPlayerSetting)) {
          gameSettingsForm.controls["specificPlayerActivated"].disable();
        } else {
          gameSettingsForm.controls["specificPlayerActivated"].enable();
        }
        
        gameSettingsForm.controls['specificPlayerActivated'].updateValueAndValidity();
        gameSettingsForm.controls['specificPlayerId'].updateValueAndValidity();
    }

    export function prepareDrinkingGameSetting(gameSettingsForm: FormGroup, defaultDrinkingGameSetting?: DefaultGameSetting) {
        if (!!!defaultDrinkingGameSetting) {
            gameSettingsForm.controls[drinkingGameSettingName].setValue(false);
            gameSettingsForm.controls[drinkingGameSettingName].enable();
        } else {
            if (defaultDrinkingGameSetting.requirement === DefaultGameSettingRequirement.required && defaultDrinkingGameSetting.valueSource !== DefaultGameSettingValueSource.user) {
                if (defaultDrinkingGameSetting.valueSource === DefaultGameSettingValueSource.value) {
                    gameSettingsForm.controls[drinkingGameSettingName].setValue(defaultDrinkingGameSetting.value === "true");
                }
                if (defaultDrinkingGameSetting.valueSource === DefaultGameSettingValueSource.default) {
                    gameSettingsForm.controls[drinkingGameSettingName].setValue(false);
                }
                gameSettingsForm.controls[drinkingGameSettingName].disable();
            }
        }        
        
        gameSettingsForm.controls['specificPlayerActivated'].updateValueAndValidity();
    }

    export function areSettingsPreset(defaultGameSettings?: DefaultGameSetting[]) {
        if (
            !!defaultGameSettings &&
            !!defaultGameSettings.find(s => s.settingName === drinkingGameSettingName && s.requirement === DefaultGameSettingRequirement.required && s.valueSource !== DefaultGameSettingValueSource.user) &&
            !!defaultGameSettings.find(s => s.settingName === speficiPlayerIdSettingName && s.requirement === DefaultGameSettingRequirement.required && s.valueSource !== DefaultGameSettingValueSource.user)
        ) {
            return true;
        }
        return false;
    }

    export function settingInputRequired(settingName: string, defaultGameSetting?: DefaultGameSetting, defaultGameSettings?: DefaultGameSetting[]) {
        if (!!!defaultGameSetting && (!!!defaultGameSettings || defaultGameSettings.length === 0)) return false;
        if (!!!defaultGameSetting) {
            defaultGameSetting = defaultGameSettings!.find(ds => ds.settingName === settingName);
        }
        return !!defaultGameSetting && defaultGameSetting.requirement === DefaultGameSettingRequirement.required && defaultGameSetting.valueSource === DefaultGameSettingValueSource.user;
    }
    
    /**
     * Can a setting be edited
     *
     * @param {string} settingName
     * @param {?DefaultGameSetting[]} [defaultGameSettings]
     * @returns {boolean}
     */
    export function settingAvailable(settingName: string, defaultGameSetting?: DefaultGameSetting, defaultGameSettings?: DefaultGameSetting[]) {
        if (!!!defaultGameSetting && (!!!defaultGameSettings || defaultGameSettings.length === 0)) return true ;
        if (!!!defaultGameSetting) {
            defaultGameSetting = defaultGameSettings!.find(ds => ds.settingName === settingName);
        }
        return !!!defaultGameSetting || !(defaultGameSetting.requirement === DefaultGameSettingRequirement.required && (defaultGameSetting.valueSource === DefaultGameSettingValueSource.default || defaultGameSetting.valueSource === DefaultGameSettingValueSource.value));
    }
}