import {GuitarString, GuitarType} from '../../types';

export const GUITAR_TYPE_NAMES: Record<GuitarType, string> = {
  [GuitarType.Acoustic]: 'Акустические гитары',
  [GuitarType.Electro]: 'Электрогитары',
  [GuitarType.Ukulele]: 'Укулеле'
};

export const GUITAR_STRINGS_NAMES: Record<GuitarString, string> = {
  [GuitarString.Four]: '4',
  [GuitarString.Six]: '6',
  [GuitarString.Seven]: '7',
  [GuitarString.Twelve]: '12'
};

export const GUITAR_TYPE_SPECIFICATION: Record<GuitarType, string[]> = {
  [GuitarType.Acoustic]: ['6', '7', '12'],
  [GuitarType.Electro]: ['4', '6', '7'],
  [GuitarType.Ukulele]: ['4']
};

export const GUITAR_STRING_SPECIFICATION: Record<GuitarString, GuitarType[]> = {
  [GuitarString.Four]: [GuitarType.Ukulele, GuitarType.Electro],
  [GuitarString.Six]: [GuitarType.Acoustic, GuitarType.Electro],
  [GuitarString.Seven]: [GuitarType.Acoustic, GuitarType.Electro],
  [GuitarString.Twelve]: [GuitarType.Acoustic]
};
