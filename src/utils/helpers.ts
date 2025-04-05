import CryptoJS from 'crypto-js';
import { conditionsObj } from '@/constants';
import { IConditions, ILocalPassword, IPassword, TPasswordStrength, TTabValues } from '@/types';
import { RefObject } from 'react';
import { remove } from 'remove-accents';
import { words } from '@/constants/words';

/**
 * Selects the entire text content of an element
 *
 * @param {RefObject<HTMLElement>} ref - Reference to the DOM element whose content should be selected
 */
export const selectArea = (ref: RefObject<HTMLElement>) => {
  if (ref.current) {
    const range = document.createRange();
    range.selectNodeContents(ref.current);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

/**
 * Copies text to clipboard and shows a temporary alert
 *
 * @param {string} text - The text to copy to clipboard
 * @param {(set: boolean) => void} alertState - Function to control the alert visibility state
 * @param {number} alertDuration - Duration in milliseconds to show the alert
 */
export const copyToClipboard = (text: string, alertState: (set: boolean) => void, alertDuration: number) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alertState(true);
      setTimeout(() => {
        alertState(false);
      }, alertDuration);
    })
    .catch((err) => {
      console.error('Failed to copy password: ', err);
    });
};

/**
 * Determines if a password condition checkbox should be disabled
 * Prevents disabling the last enabled condition
 *
 * @param {keyof IConditions} key - The condition key to check
 * @param {IConditions} conditions - Current state of all password conditions
 * @returns {boolean} True if the checkbox should be disabled
 */
export const handleDisabiling = (key: keyof IConditions, conditions: IConditions): boolean => {
  const isItself = conditions[key];
  const trueCount = Object.values(conditions).filter(Boolean).length;
  return trueCount === 1 && isItself;
};

/**
 * Generates a password based on specified conditions and type
 *
 * @param {number} length - Length of the password to generate
 * @param {IConditions} conditions - Password conditions (uppercase, lowercase, numbers, symbols)
 * @param {<P extends keyof IPassword>(key: P, value: IPassword[P]) => void} handleSetPassword - Function to update password state
 * @param {TTabValues} passwordType - Type of password to generate ('random', 'memorable', or 'pin')
 * @param {boolean} capitalizeFirstLetter - Whether to capitalize the first letter of each word in memorable passwords
 */
export const passwordGenerator = (
  length: number,
  conditions: IConditions,
  handleSetPassword: <P extends keyof IPassword>(key: P, value: IPassword[P]) => void,
  passwordType: TTabValues,
  capitalizeFirstLetter: boolean,
) => {
  if (passwordType === 'random') {
    let combinedConditions = '';
    let guaranteedCharacters = '';

    for (const key in conditions) {
      if (conditions[key as keyof IConditions]) {
        combinedConditions += conditionsObj[key as keyof IConditions];
        const randomIndex = Math.floor(Math.random() * conditionsObj[key as keyof IConditions].length);
        guaranteedCharacters += conditionsObj[key as keyof IConditions][randomIndex];
      }
    }

    let password = guaranteedCharacters;

    for (let i = guaranteedCharacters.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * combinedConditions.length);
      password += combinedConditions[randomIndex];
    }
    password = shuffle(password.split('')).join('');

    handleSetPassword('value', password);
    handleSetPassword('strength', getPasswordStrength(password, conditions));
  } else if (passwordType === 'memorable') {
    const shuffledPassword = shuffle(words.split(',')).slice(0, length);
    const memorablePassword = capitalizeFirstLetter
      ? shuffledPassword.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`).join('-')
      : shuffledPassword.join('-');
    handleSetPassword('value', memorablePassword);
  } else {
    let pinPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * conditionsObj.numbers.length);
      pinPassword += conditionsObj.numbers[randomIndex];
    }
    handleSetPassword('value', pinPassword);
  }
};

/**
 * Calculates password strength based on complexity and length
 *
 * @param {string} password - The password to evaluate
 * @param {IConditions} checkedConditions - The active password conditions
 * @returns {TPasswordStrength} Password strength rating ('very-weak', 'weak', 'good', 'strong', or 'very-strong')
 */
const getPasswordStrength = (password: string, checkedConditions: IConditions): TPasswordStrength => {
  const { uppercase, lowercase, numbers, symbols } = checkedConditions;

  let charsetSize = 0;
  if (uppercase) charsetSize += 26; // A-Z
  if (lowercase) charsetSize += 26; // a-z
  if (numbers) charsetSize += 10; // 0-9
  if (symbols) charsetSize += 32; // Common symbols

  const entropy = password.length * Math.log2(charsetSize);

  const crackingSpeed = 1e9; // 1 billion guesses per second (assumed)
  const timeToCrack = Math.pow(2, entropy) / crackingSpeed;

  if (timeToCrack < 1e3) return 'very-weak'; // Less than 1,000 seconds (~16 minutes)
  if (timeToCrack < 1e6) return 'weak'; // Less than 1,000,000 seconds (~11 days)
  if (timeToCrack < 1e9) return 'good'; // Less than 1,000,000,000 seconds (~31 years)
  if (timeToCrack < 1e12) return 'strong'; // Less than 1,000,000,000,000 seconds (~31,000 years)
  return 'very-strong'; // More than 1,000,000,000,000 seconds
};

/**
 * Generates a new password with an animation effect
 *
 * @param {number} length - Length of the password to generate
 * @param {IConditions} conditions - Password conditions (uppercase, lowercase, numbers, symbols)
 * @param {<P extends keyof IPassword>(key: P, value: IPassword[P]) => void} handleSetPassword - Function to update password state
 * @param {(rotate: boolean) => void} setRotate - Function to control rotation animation
 * @param {TTabValues} passwordType - Type of password to generate ('random', 'memorable', or 'pin')
 * @param {boolean} capitalizeFirstLetter - Whether to capitalize the first letter of each word in memorable passwords
 */
export const generateAndAnimatePassword = (
  length: number,
  conditions: IConditions,
  handleSetPassword: <P extends keyof IPassword>(key: P, value: IPassword[P]) => void,
  setRotate: (rotate: boolean) => void,
  passwordType: TTabValues,
  capitalizeFirstLetter: boolean,
) => {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
  setRotate(true);

  let newPassword = '';
  passwordGenerator(
    length,
    conditions,
    (key, value) => {
      if (key === 'value') {
        newPassword = value as string;
      } else {
        handleSetPassword(key, value);
      }
    },
    passwordType,
    capitalizeFirstLetter,
  );

  let scrambleCharacters = '';
  if (passwordType === 'memorable') {
    scrambleCharacters = conditionsObj.lowercase;
  } else if (passwordType === 'pin') {
    scrambleCharacters = conditionsObj.numbers;
  } else {
    for (const key in conditions) {
      if (conditions[key as keyof IConditions]) {
        scrambleCharacters += conditionsObj[key as keyof IConditions];
      }
    }
  }

  animateScrambleReveal(newPassword, scrambleCharacters, (val) => handleSetPassword('value', val));

  setTimeout(() => {
    setRotate(false);
  }, 300);
};

/**
 * Shuffles an array using the Fisher-Yates algorithm
 *
 * @param {string[]} array - Array to shuffle
 * @returns {string[]} New shuffled array
 */
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Generates a random ID string with specified length
 *
 * @param {number} length - Length of the ID to generate (default: 8)
 * @returns {string} Random ID string
 */
export const generateRandomID = (length: number = 8) => {
  const characters = conditionsObj.lowercase + conditionsObj.uppercase + conditionsObj.numbers;
  let randomID = '';
  for (let i = 0; i < length; i++) {
    randomID += characters[Math.floor(Math.random() * characters.length)];
  }
  return randomID;
};

/**
 * Animate revealing a password by scrambling and then revealing each character over time.
 *
 * @param {string} originalValue - The actual password to reveal
 * @param {string} scrambleChars - A string of possible characters for scrambling
 * @param {(val: string) => void} onUpdate - A function to update the password value in the UI
 * @param {number} totalDuration - The total animation duration in milliseconds (default: 300)
 */
export const animateScrambleReveal = (
  originalValue: string,
  scrambleChars: string,
  onUpdate: (val: string) => void,
  totalDuration = 300,
) => {
  let animatedValue = originalValue
    .split('')
    .map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)])
    .join('');
  onUpdate(animatedValue);

  originalValue.split('').forEach((char, index) => {
    setTimeout(
      () => {
        animatedValue = animatedValue
          .split('')
          .map((c, i) =>
            i <= index ? originalValue[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)],
          )
          .join('');
        onUpdate(animatedValue);
      },
      index * (totalDuration / originalValue.length),
    );
  });
};

/**
 * Encrypts data using AES encryption
 *
 * @param {any} data - Data to encrypt
 * @param {string} masterPassword - Master password for encryption
 * @returns {string} Encrypted data as string
 */
export const encryptData = (data: any, masterPassword: string): string => {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, masterPassword).toString();
};

/**
 * Decrypts data using AES encryption
 *
 * @param {string} encryptedData - Encrypted data string
 * @param {string} masterPassword - Master password for decryption
 * @param {() => void} onError - Callback function to execute on decryption error
 * @returns {any} Decrypted data or null on failure
 */
export const decryptData = (encryptedData: string, masterPassword: string, onError: () => void): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, masterPassword);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Failed to decrypt data: ', error);
    setTimeout(() => {
      onError();
    }, 1);
    return null;
  }
};

/**
 * Gets a secure device fingerprint by combining multiple device characteristics
 * The fingerprint is used as part of the encryption key derivation process
 *
 * @returns {string} Secure device fingerprint as SHA-256 hash
 */
export const getSecureDeviceFingerprint = (): string => {
  const storedDeviceId = localStorage.getItem('device_fingerprint') || generateRandomID(32);
  const browserData = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.pixelDepth,
    new Date().getTimezoneOffset(),
  ].join('|');

  let hardwareStr = '';
  if (navigator.hardwareConcurrency) {
    hardwareStr = `cores:${navigator.hardwareConcurrency}`;
  }

  const combinedFingerprint = [storedDeviceId, browserData, hardwareStr].join('###');
  const secureFingerprint = CryptoJS.SHA256(combinedFingerprint).toString();

  if (!localStorage.getItem('device_fingerprint')) {
    localStorage.setItem('device_fingerprint', storedDeviceId);
  }

  return secureFingerprint;
};

/**
 * Derives a master password from the device fingerprint using PBKDF2
 * This creates a secure, device-specific encryption key
 *
 * @returns {string} Derived master password for encryption/decryption
 */
export const getMasterPassword = (): string => {
  const secureFingerprint = getSecureDeviceFingerprint();
  const salt = process.env.NEXT_PUBLIC_MASTER_KEY || 'my_super_secret_salt';
  const keySize = 256 / 32;
  const iterations = 10000;
  const derivedKey = CryptoJS.PBKDF2(secureFingerprint, salt, { keySize, iterations }).toString();

  return derivedKey;
};

/**
 * Filters passwords based on search query
 * Performs case-insensitive search on service and email fields
 * Removes accents from both search query and password data for better matching
 *
 * @param {ILocalPassword[]} passwords - Array of passwords to filter
 * @param {string} searchQuery - Search query string
 * @returns {ILocalPassword[]} Filtered array of passwords
 */
export function filterPasswords(passwords: ILocalPassword[], searchQuery: string) {
  const trimmedQuery = remove(searchQuery.trim()).toLowerCase();

  if (!trimmedQuery) return passwords;

  return passwords.filter(
    (p) =>
      remove(p.service).toLowerCase().includes(trimmedQuery) || remove(p.email).toLowerCase().includes(trimmedQuery),
  );
}
