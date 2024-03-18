import * as R from 'ramda';

export const isNullOrEmpty = (value: any) => R.isEmpty(value) || R.isNil(value);