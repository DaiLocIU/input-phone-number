import { PropType } from 'vue';

export interface Ref<T> {
  value: T
}
// eslint-disable-next-line no-shadow
export enum InputModeEnum {
  'text',
  'none',
  'tel',
  'url',
  'email',
  'numeric',
  'decimal',
  'search'
}

type TypedProps<T> = {
  [key in keyof T]: {
  type: PropType<T[key]>
  required?: boolean
} | PropType<T[key]>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function typedProps<T extends object>(props: TypedProps<T>): TypedProps<T> {
  return props;
}
