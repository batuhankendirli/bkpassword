import React, { memo } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  handleOpenChange: (value: boolean) => void;
  onDelete: () => void;
}

const DeleteDialog = ({ isOpen, handleOpenChange, onDelete }: Props) => {
  const t = useTranslations();

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('homepage.delete-dialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('homepage.delete-dialog.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button>{t('homepage.delete-dialog.cancel')}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="warning" onClick={onDelete}>
              {t('homepage.delete-dialog.delete')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(DeleteDialog);
