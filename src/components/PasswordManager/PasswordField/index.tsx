import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import yup from '@/plugins/yup';
import { Button } from '@/components/ui/button';
import { buttonGroupVariants, formItemVariants, formVariants } from '@/utils/motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateRandomID } from '@/utils/helpers';
import { ILocalPassword } from '@/types';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { PasswordFieldAddOrUpdate } from '@/validations/password-add-field.validation';
import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './password-field.module.scss';

const cx = classNames.bind(styles);

interface Props {
  onSubmitted: (data: ILocalPassword) => void;
  onCancel: () => void;
  defaultValues?: Omit<ILocalPassword, 'id'>;
}

const PasswordField = forwardRef<HTMLDivElement, Props>(
  ({ onSubmitted, onCancel, defaultValues = { email: '', password: '', service: '' } }, ref) => {
    const t = useTranslations();

    const form = useForm<yup.InferType<typeof PasswordFieldAddOrUpdate>>({
      resolver: yupResolver(PasswordFieldAddOrUpdate),
      defaultValues,
    });

    const onSubmit = (data: yup.InferType<typeof PasswordFieldAddOrUpdate>) => {
      const { email, password, service } = data;
      const obj: ILocalPassword = {
        id: generateRandomID(),
        email,
        password,
        service,
      };
      onSubmitted(obj);
    };

    return (
      <motion.div
        className={cx('password-field')}
        ref={ref}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <div className={cx('password-field__wrapper')}>
              <motion.div variants={formItemVariants}>
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('homepage.password-field.service.label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('homepage.password-field.service.placeholder')} {...field} autoFocus />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('homepage.password-field.username.label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('homepage.password-field.username.placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('homepage.password-field.password.label')}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t('homepage.password-field.password.placeholder')}
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div className={cx('password-field__wrapper__buttons')} variants={buttonGroupVariants}>
                <Button
                  className={cx('password-field__wrapper__buttons__button')}
                  type="button"
                  variant="warning"
                  onClick={onCancel}
                >
                  {t('homepage.password-field.cancel')}
                </Button>
                <Button className={cx('password-field__wrapper__buttons__button')} type="submit" variant="default">
                  {t('homepage.password-field.save')}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </motion.div>
    );
  },
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
