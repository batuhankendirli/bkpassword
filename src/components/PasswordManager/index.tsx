'use client';

import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import ButtonCopy from '../ButtonCopy';
import classNames from 'classnames/bind';
import ComponentWithTooltip from '../ComponentWithTooltip';
import DeleteDialog from '../DeleteDialog';
import PasswordField from './PasswordField';
import useKeyboardDetector from '@/hooks/useKeyboardDetector';
import usePasswordManager from '@/hooks/usePasswordManager';
import useScrollLock from '@/hooks/useScrollLock';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import {
  containerVariants,
  dividerVariants,
  emptyButtonVariants,
  emptyTextVariants,
  emptyWrapperVariants,
  itemVariants,
  noResultButtonVariants,
  noResultTextVariants,
  noResultWrapperVariants,
  overlayVariants,
} from '@/utils/motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { filterPasswords } from '@/utils/helpers';
import { ILocalPassword } from '@/types';
import { Input } from '../ui/input';
import { IoAdd, IoPencil, IoTrash } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

import styles from './password-manager.module.scss';

const cx = classNames.bind(styles);

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const PasswordManager = ({ isOpen, setIsOpen }: Props) => {
  const t = useTranslations();
  const [addNewField, setAddNewField] = useState<boolean>(false);
  const [editField, setEditField] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordToEdit, setPasswordToEdit] = useState<ILocalPassword | null>(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    selectedID: '',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const editFieldRef = useRef<HTMLDivElement>(null);
  const passwordsRef = useRef<HTMLDivElement>(null);
  const keyboardHeight = useKeyboardDetector();
  const { passwords, addOrUpdatePassword, deletePassword } = usePasswordManager();

  useScrollLock(isFocused, passwordsRef);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (editField && editFieldRef.current) {
        editFieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [editField, passwordToEdit]);

  const handleSubmit = (data: ILocalPassword) => {
    if (editField && passwordToEdit) {
      setEditField(false);
      setPasswordToEdit(null);
      setIsFocused(false);
      addOrUpdatePassword(data, passwordToEdit.id);
    } else {
      setAddNewField(false);
      setIsFocused(false);
      addOrUpdatePassword(data);
    }
  };

  const handleDelete = () => {
    setDeleteDialog({ ...deleteDialog, isOpen: false });
    deletePassword(deleteDialog.selectedID);
  };

  const handleEdit = (password: ILocalPassword) => {
    setPasswordToEdit(password);
    setEditField(true);
    setIsFocused(true);
  };

  const filteredPasswords = filterPasswords(passwords, searchQuery);
  const showNothingFound = searchQuery.trim() && filteredPasswords.length === 0 && passwords.length > 0;
  const showNoPasswordsYet = passwords.length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onInteractOutside={(e) => isFocused && e.preventDefault()}
        onEscapeKeyDown={(e) => isFocused && e.preventDefault()}
        disableCloseButton={isFocused}
        overlayClassName={cx({ 'password-manager__overlay--focus': isFocused })}
        className={cx('password-manager', {
          'password-manager--focus': isFocused,
        })}
      >
        <DialogHeader>
          <DialogTitle className={cx('password-manager__title')}>{t('homepage.passwords-dialog.title')}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className={cx('password-manager__content')}>
            {showNoPasswordsYet ? (
              <motion.div
                className={cx('password-manager__content--no-password')}
                variants={emptyWrapperVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                style={{
                  paddingBottom: addNewField ? `${keyboardHeight}px` : '',
                }}
              >
                {!addNewField && (
                  <>
                    <motion.p
                      className={cx('password-manager__content--no-password__text')}
                      variants={emptyTextVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {t('homepage.passwords-dialog.no-passwords.title')}
                      <br />
                      <motion.span
                        className={cx('password-manager__content--no-password__text__span')}
                        variants={emptyTextVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                      >
                        {t('homepage.passwords-dialog.no-passwords.description')}
                      </motion.span>
                    </motion.p>
                    <motion.div
                      className={cx('password-manager__content--no-password__container')}
                      variants={emptyButtonVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: 0.3,
                      }}
                    >
                      <Button
                        className={cx('password-manager__content--no-password__container__button')}
                        onClick={() => {
                          setAddNewField(true);
                          setIsFocused(true);
                        }}
                        disabled={isFocused}
                      >
                        {t('homepage.passwords-dialog.no-passwords.button')}
                      </Button>
                    </motion.div>
                  </>
                )}
                {addNewField && (
                  <PasswordField
                    onSubmitted={handleSubmit}
                    onCancel={() => {
                      setAddNewField(false);
                      setIsFocused(false);
                    }}
                  />
                )}
                <AnimatePresence>
                  {isFocused && (
                    <motion.div
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={cx('password-manager__focus-overlay')}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <>
                <div className={cx('password-manager__content__search-area')}>
                  <Input
                    type="search"
                    placeholder={t('homepage.passwords-dialog.search.placeholder')}
                    disabled={isFocused}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <ComponentWithTooltip tooltip={t('homepage.tooltip.new-password')}>
                    <Button
                      size="icon-sm"
                      onClick={() => {
                        passwordsRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                        setAddNewField(true);
                        setIsFocused(true);
                        setSearchQuery('');
                      }}
                      disabled={isFocused}
                    >
                      <IoAdd className={cx('password-manager__content__search-area__add')} />
                    </Button>
                  </ComponentWithTooltip>
                </div>
                <div className={cx('password-manager__content__wrapper')} ref={passwordsRef}>
                  {addNewField && (
                    <PasswordField
                      onSubmitted={handleSubmit}
                      onCancel={() => {
                        setAddNewField(false);
                        setIsFocused(false);
                      }}
                    />
                  )}
                  <AnimatePresence>
                    {isFocused && (
                      <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={cx('password-manager__focus-overlay')}
                      />
                    )}
                  </AnimatePresence>
                  {showNothingFound ? (
                    <AnimatePresence>
                      <motion.div
                        className={cx('password-manager__content__nothing-found')}
                        variants={noResultWrapperVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                          height: keyboardHeight > 0 ? `calc(100% - ${keyboardHeight}px)` : '',
                        }}
                      >
                        <motion.p
                          className={cx('password-manager__content__nothing-found__text')}
                          variants={noResultTextVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            delay: 0.2,
                          }}
                        >
                          {t('homepage.passwords-dialog.search.no-results')}
                        </motion.p>
                        <motion.div
                          variants={noResultButtonVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            delay: 0.3,
                          }}
                        >
                          <Button variant="outline" onClick={() => setSearchQuery('')} disabled={isFocused}>
                            {t('homepage.passwords-dialog.search.reset')}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <motion.div
                      className={cx('password-manager__content__wrapper__list')}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        paddingBottom: `${keyboardHeight}px`,
                      }}
                    >
                      <AnimatePresence mode="sync" initial={false}>
                        {filteredPasswords.map((password, index) => (
                          <Fragment key={password.id}>
                            {editField && passwordToEdit?.id === password.id ? (
                              <PasswordField
                                key={`edit-${password.id}`}
                                ref={editFieldRef}
                                onSubmitted={(data) => handleSubmit(data)}
                                onCancel={() => {
                                  setPasswordToEdit(null);
                                  setEditField(false);
                                  setIsFocused(false);
                                }}
                                defaultValues={{
                                  service: password.service,
                                  email: password.email,
                                  password: password.password,
                                }}
                              />
                            ) : (
                              <motion.div
                                className={cx('password-manager__content__wrapper__list__item')}
                                variants={itemVariants}
                                layout="position"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <div className={cx('password-manager__content__wrapper__list__item__left')}>
                                  <ButtonCopy password={password.password} disabled={isFocused} />
                                  <div className={cx('password-manager__content__wrapper__list__item__left__texts')}>
                                    <p
                                      className={cx(
                                        'password-manager__content__wrapper__list__item__left__texts__service',
                                      )}
                                    >
                                      {password.service}
                                    </p>
                                    <p
                                      className={cx(
                                        'password-manager__content__wrapper__list__item__left__texts__email',
                                      )}
                                    >
                                      {password.email}
                                    </p>
                                  </div>
                                </div>
                                <div className={cx('password-manager__content__wrapper__list__item__right')}>
                                  <ComponentWithTooltip tooltip={t('homepage.tooltip.edit')}>
                                    <Button size="icon-sm" onClick={() => handleEdit(password)} disabled={isFocused}>
                                      <IoPencil />
                                    </Button>
                                  </ComponentWithTooltip>
                                  <ComponentWithTooltip tooltip={t('homepage.tooltip.delete')}>
                                    <Button
                                      size="icon-sm"
                                      onClick={() => setDeleteDialog({ isOpen: true, selectedID: password.id })}
                                      disabled={isFocused}
                                    >
                                      <IoTrash />
                                    </Button>
                                  </ComponentWithTooltip>
                                </div>
                              </motion.div>
                            )}

                            {index !== filteredPasswords.length - 1 &&
                              !(editField && passwordToEdit?.id === password.id) && (
                                <motion.hr
                                  className={cx('password-manager__hr')}
                                  variants={dividerVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  layout="position"
                                />
                              )}
                          </Fragment>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        handleOpenChange={(value) => setDeleteDialog({ ...deleteDialog, isOpen: value })}
        onDelete={handleDelete}
      />
    </Dialog>
  );
};

export default memo(PasswordManager);
