import { animate, state, style, transition, trigger } from "@angular/animations";

export const sideNavAnimation = trigger(
  'sideNavAnimation', [
    state('true', style({
      width: '250px',
    })),
    state('false', style({
      width: '100px',
    })),
    transition('true <=> false', [
      animate('0.3s ease-in-out'),
    ]),
]);
export const sideNavAnimationMobile = trigger(
  'sideNavAnimationMobile', [
    state('true', style({
      width: '100%',
    })),
    state('false', style({
      width: '0px',
    })),
    transition('true <=> false', [
      animate('0.3s ease-in-out'),
    ]),
]);
export const notificationsAnimation = trigger(
  'notificationsAnimation', [
    state('true', style({
      width: '340px',
    })),
    state('false', style({
      width: '0px',
    })),
    transition('true <=> false', [
      animate('0.3s ease-in-out'),
    ]),
]);
export const dropdownMenuAnimation = trigger(
  'dropdownMenuAnimation', [
    state('true', style({
      height: '50px',
      transform: 'translateY(0px)',
      opacity: 1,
    })),
    state('false', style({
      height: '0px',
      transform: 'translateY(0)',
      opacity: 0,
    })),
    transition('true <=> false', [
      animate('0.3s ease-in-out'),
    ]),
]);

export const enterAnimation = trigger(
    'enterAnimation', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)', opacity: 0 }),
      animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate('200ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
    ])
]);
