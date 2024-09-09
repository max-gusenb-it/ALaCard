import { trigger, style, transition, animate, keyframes } from "@angular/animations";

export const slideInOut =  trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateX(150%)'}),
      animate('300ms ease-in', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate('300ms ease-in', style({transform: 'translateX(-150%)'}))
    ])
])