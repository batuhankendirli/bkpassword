export interface IConditions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
export type TTabValues = 'random' | 'memorable' | 'pin';

export type TPasswordStrength = 'very-weak' | 'weak' | 'good' | 'strong' | 'very-strong';

export interface IPassword {
  value: string;
  length: number;
  strength: TPasswordStrength;
}

export interface ILocalPassword {
  id: string;
  service: string;
  email: string;
  password: string;
}
