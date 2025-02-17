import { DefaultGameSettingRequirement, DefaultGameSettingValueSource } from "../../../enums";

export interface DefaultGameSetting {
    settingName: string;
    value?: string;
    valueSource: DefaultGameSettingValueSource;
    requirement: DefaultGameSettingRequirement;
}