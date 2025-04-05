import * as yup from 'yup';

const configuredYupLocale: yup.LocaleObject = {
  mixed: {
    default: {
      key: 'validation.invalid',
    },
    required: {
      key: 'validation.required',
    },
    oneOf: {
      key: 'validation.one-of',
    },
    notOneOf: {
      key: 'validation.not-one-of',
    },
    notType: ({ type }) => {
      if (type === 'number')
        return {
          key: 'validation.number',
        };
      return {
        key: 'validation.invalid',
      };
    },
  },
  string: {
    length: ({ length }) => ({
      key: 'validation.length',
      values: { length },
    }),
    min: ({ min }) => ({
      key: 'validation.min',
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'validation.max',
      values: { max },
    }),
    matches: {
      key: 'validation.matches',
    },
    email: {
      key: 'validation.email',
    },
    url: {
      key: 'validation.url',
    },
    uuid: {
      key: 'validation.uuid',
    },
    trim: {
      key: 'validation.trim',
    },
    lowercase: {
      key: 'validation.lowercase',
    },
    uppercase: {
      key: 'validation.uppercase',
    },
  },
  number: {
    min: ({ min }) => ({
      key: 'validation.min-number',
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'validation.max-number',
      values: { max },
    }),
    lessThan: ({ less }) => ({
      key: 'validation.less-than',
      values: { less },
    }),
    moreThan: ({ more }) => ({
      key: 'validation.more-than',
      values: { more },
    }),
    positive: {
      key: 'validation.positive',
    },
    negative: {
      key: 'validation.negative',
    },
    integer: {
      key: 'validation.integer',
    },
  },
  date: {
    min: ({ min }) => ({
      key: 'validation.min-date',
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'validation.max-date',
      values: { max },
    }),
  },
  array: {
    min: ({ min }) => ({
      key: 'validation.min-array',
      values: { min },
    }),
    max: ({ max }) => ({
      key: 'validation.max-array',
      values: { max },
    }),
  },
};

yup.setLocale(configuredYupLocale);

export default yup;
