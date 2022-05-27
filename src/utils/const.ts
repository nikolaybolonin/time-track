import keyMirror from 'keymirror';

export const activities = keyMirror({
  selftime: null,
  work: null,
  animals: null,
});

export type Activity = keyof typeof activities;
