import { omitBy, isEmpty } from 'lodash'
import { httpError } from '../../types'

export const cleanObj = (obj: httpError) => omitBy(obj, isEmpty);

export const cleanSpace = (obj: any) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : value,
    ]),
  );

export function isEmptyValues(value: any) {
  return (
    (!value && typeof value !== 'boolean') ||
    !value.toString().trim() ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim()?.length === 0)
  );
}

export const omitEmpty = (obj: any) => omitBy(obj, isEmptyValues);

export const p = (req: any): Object => {
  return cleanSpace(
    omitEmpty({
      ...req.query,
      ...req.body,
      ...req.params,
      user: req?.customer || req?.admin,
      lang: req.body?.lang || 'EN',
    }),
  );
};