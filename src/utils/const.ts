import keyMirror from 'keymirror';

export const activities = keyMirror({
  selftime: null,
  work: null,
  animals: null,
});

export type Activity = keyof typeof activities;

export type Category = {
  name: string;
  color: string;
};

export type Categories = {
  [cat: string]: Category;
};

export type Tile = {
  id: string;
  category?: string;
  activity?: string;
  time?: number;
  lastTimeStamp?: number;
};

export const defaultTile = {
  category: activities.selftime,
  activity: 'Coding',
  time: 0,
  lastTimeStamp: 0,
};
