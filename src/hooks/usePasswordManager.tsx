import { useState, useEffect } from 'react';
import { ILocalPassword } from '@/types';
import { decryptData, encryptData, getMasterPassword } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

/**
 * Custom hook for managing encrypted passwords
 *
 * This hook handles loading, saving, adding, updating, and deleting passwords.
 * All passwords are encrypted with AES-256 before storage in localStorage and
 * decrypted when retrieved.
 *
 * @returns {Object} Functions and state for password management
 * @returns {ILocalPassword[]} passwords - Array of decrypted password objects
 * @returns {Function} addOrUpdatePassword - Add new or update existing password
 * @returns {Function} deletePassword - Delete a password by ID
 */
const usePasswordManager = () => {
  const t = useTranslations();
  const [passwords, setPasswords] = useState<ILocalPassword[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    /**
     * Handle failed decryption attempts
     * Clears storage and shows error toast to user
     */
    const handleFailedDecrypt = () => {
      localStorage.removeItem('passwords');
      localStorage.removeItem('device_fingerprint');

      toast({
        title: t('homepage.toasts.unable-to-retrieve-passwords.title'),
        description: t('homepage.toasts.unable-to-retrieve-passwords.description'),
        variant: 'error',
        icon: 'toast-error',
        duration: 5000,
      });
    };

    if (typeof window !== 'undefined') {
      const encryptedData = localStorage.getItem('passwords');
      const masterPassword = getMasterPassword();

      if (encryptedData) {
        try {
          const decryptedPasswords = decryptData(encryptedData, masterPassword, handleFailedDecrypt);
          if (decryptedPasswords) {
            setPasswords(decryptedPasswords);
          }
        } catch (error) {
          console.error('Failed to load passwords: ', error);
          setPasswords([]);
          handleFailedDecrypt();
        }
      }
    }
  }, []);

  /**
   * Save passwords to localStorage with encryption
   *
   * @param {ILocalPassword[]} data - Array of password objects to encrypt and store
   */
  const saveEncryptedPasswords = (data: ILocalPassword[]) => {
    const masterPassword = getMasterPassword();
    const encryptedData = encryptData(data, masterPassword);
    localStorage.setItem('passwords', encryptedData);
  };

  /**
   * Add a new password or update an existing one
   *
   * @param {ILocalPassword} data - Password data to add or update
   * @param {string} [editId] - Optional ID of password to update
   * @returns {ILocalPassword[]} Updated array of all passwords
   */
  const addOrUpdatePassword = (data: ILocalPassword, editId?: string) => {
    if (editId) {
      // Update existing password
      const updatedPasswords = passwords.map((password) =>
        password.id === editId ? { ...password, ...data, id: editId } : password,
      );
      setPasswords(updatedPasswords);
      saveEncryptedPasswords(updatedPasswords);
      toast({
        title: t('homepage.toasts.password-updated.title'),
        icon: 'toast-success',
      });
      return updatedPasswords;
    } else {
      // Add new password
      const allPasswords = [{ ...data }, ...passwords];
      setPasswords(allPasswords);
      saveEncryptedPasswords(allPasswords);
      toast({
        title: t('homepage.toasts.password-added.title'),
        icon: 'toast-success',
      });
      return allPasswords;
    }
  };

  /**
   * Delete a password by ID
   *
   * @param {string} id - ID of the password to delete
   * @returns {ILocalPassword[]} Updated array of remaining passwords
   */
  const deletePassword = (id: string) => {
    const allPasswords = passwords.filter((password) => password.id !== id);
    setPasswords(allPasswords);
    saveEncryptedPasswords(allPasswords);
    toast({
      title: t('homepage.toasts.password-deleted.title'),
      icon: 'toast-success',
    });
    return allPasswords;
  };

  return {
    passwords,
    addOrUpdatePassword,
    deletePassword,
  };
};

export default usePasswordManager;
