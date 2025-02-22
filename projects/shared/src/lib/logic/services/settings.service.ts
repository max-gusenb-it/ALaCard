import { Injectable } from '@angular/core';
import { systemDefaultValue } from '../../utils/constants/systemDefaultValue';
import { LanguageUtils } from '../../utils/utils/language.util';
import { TranslateService } from '@ngx-translate/core';

// ToDo - structure: Think about location and usage

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private translateService: TranslateService) { }

  setAppLanguage(lang: string) {
    if (lang !== systemDefaultValue) this.translateService.setDefaultLang(lang);
    else this.translateService.setDefaultLang(LanguageUtils.getBrowserLanguage());
  }

  setAppColor(color: string) {
    if (!!color) {
      let colorShades = [
        "900", "800", "700", "600", "500", "400", "300", "200", "100", "000"
      ];
      const root = document.documentElement;
      colorShades.forEach(shade => {
        const rgb = this.hexToRgb(getComputedStyle(document.documentElement).getPropertyValue(`--${color}-${shade}`))!;
        root.style.setProperty(`--primary-${shade}`, `${rgb.r} ${rgb.g} ${rgb.b}`);
      });
    }
  }

  hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
