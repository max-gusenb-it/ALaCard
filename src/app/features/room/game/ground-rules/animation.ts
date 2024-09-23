import { trigger, style, transition, animate } from "@angular/animations";

export const slideInOut =  trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateX(150%)', opacity: 0}),
      animate('300ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)', opacity: 1}),
      animate('300ms ease-in', style({transform: 'translateX(-150%)', opacity: 0}))
    ])
])