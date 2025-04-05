import { IConditions } from '@/types';

interface IOptions {
  id: keyof IConditions;
  label: string;
}

export const options: IOptions[] = [
  {
    id: 'uppercase',
    label: 'ABC',
  },
  {
    id: 'lowercase',
    label: 'abc',
  },
  {
    id: 'numbers',
    label: '123',
  },
  {
    id: 'symbols',
    label: '#$&',
  },
];

export const conditionsObj: { [key in keyof IConditions]: string } = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: "~!@#$%^&()_+=-{}[],.';",
};

export const defaultValuesPerTab = {
  random: {
    length: 20,
    min: 8,
    max: 100,
  },
  memorable: {
    length: 4,
    min: 3,
    max: 15,
  },
  pin: {
    length: 6,
    min: 3,
    max: 12,
  },
};
