import { animate, group, query, style, transition, trigger } from '@angular/animations';

export let slideToggle = trigger('slideToggle', [
    transition('* => *', [
        group([
            query(':enter', style({ transform: 'translateX({{ enterStart }})', opacity: 0 }), { optional: true }),
            query(':leave', [
                animate('750ms ease-in-out', style({ transform: 'translateX({{ leaveEnd }})', opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                animate('750ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ], { optional: true })
        ])
    ],
    { 
        params: {
            leaveEnd: '',
            enterStart: ''
        }
    })
]);