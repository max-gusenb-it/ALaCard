import { DefaultGameSettingRequirement, DefaultGameSettingValueSource } from "@shared";

export interface DefaultGameSetting {
    settingName: string;
    value?: string;
    valueSource: DefaultGameSettingValueSource;
    requirement: DefaultGameSettingRequirement;
}