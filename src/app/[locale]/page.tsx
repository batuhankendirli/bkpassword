'use client';

import React, { useEffect, useState } from 'react';
import ButtonCopy from '@/components/ButtonCopy';
import classNames from 'classnames/bind';
import ComponentWithTooltip from '@/components/ComponentWithTooltip';
import InfoDialog from '@/components/InfoDialog';
import Logo from '@/components/Logo';
import PasswordArea from '@/components/PasswordArea';
import PasswordConditions from '@/components/PasswordConditions';
import PasswordLength from '@/components/PasswordLength';
import PasswordManager from '@/components/PasswordManager';
import ThemeSwitch from '@/components/ui/theme-switch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { defaultValuesPerTab } from '@/constants';
import { generateAndAnimatePassword, passwordGenerator } from '@/utils/helpers';
import { IConditions, IPassword, TTabValues } from '@/types';
import { IoInformation, IoKeyOutline, IoShuffle } from 'react-icons/io5';
import { PiHash } from 'react-icons/pi';
import { RiLightbulbLine } from 'react-icons/ri';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';

import styles from '@/styles/pages/home-page.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  const t = useTranslations();
  const [checkedConditions, setCheckedConditions] = useState<IConditions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [uppercaseFirstLetters, setUppercaseFirstLetters] = useState<boolean>(false);
  const [password, setPassword] = useState<IPassword>({
    length: 20,
    strength: 'very-strong',
    value: '',
  });
  const [rotate, setRotate] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<{ tab: TTabValues; min: number; max: number }>({
    tab: 'random',
    min: 8,
    max: 100,
  });
  const [passwordsModal, setPasswordsModal] = useState<boolean>(false);
  const [infoDialog, setInfoDialog] = useState<boolean>(false);

  useEffect(() => {
    if (password.value)
      passwordGenerator(
        password.length,
        checkedConditions,
        handleSetPassword,
        defaultValues.tab,
        uppercaseFirstLetters,
      );
  }, [password.length]);

  useEffect(() => {
    generateAndAnimatePassword(
      password.length,
      checkedConditions,
      handleSetPassword,
      setRotate,
      defaultValues.tab,
      uppercaseFirstLetters,
    );
  }, [checkedConditions, uppercaseFirstLetters]);

  const refreshPassword = () => {
    generateAndAnimatePassword(
      password.length,
      checkedConditions,
      handleSetPassword,
      setRotate,
      defaultValues.tab,
      uppercaseFirstLetters,
    );
  };

  const handleSetPassword = <P extends keyof IPassword>(key: P, value: IPassword[P]) => {
    setPassword((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTabChange = (tab: TTabValues) => {
    handleSetPassword('length', defaultValuesPerTab[tab].length);
    setDefaultValues({
      tab,
      min: defaultValuesPerTab[tab].min,
      max: defaultValuesPerTab[tab].max,
    });
  };

  return (
    <main className={cx('home')}>
      <div className={cx('home__wrapper')}>
        <div className={cx('home__wrapper__content')}>
          <div className={cx('home__wrapper__content__top')}>
            <Logo className={cx('home__wrapper__content__top__logo')} />
            <div className={cx('home__wrapper__content__top__right')}>
              <ComponentWithTooltip tooltip={t('homepage.tooltip.info')}>
                <button className={cx('home__wrapper__content__top__right__info')} onClick={() => setInfoDialog(true)}>
                  <IoInformation />
                </button>
              </ComponentWithTooltip>
              <ThemeSwitch />
            </div>
          </div>
          <div className={cx('home__wrapper__content__main')}>
            <Tabs
              defaultValue="random"
              className={cx('home__wrapper__content__main__tabs')}
              onValueChange={(e) => handleTabChange(e as TTabValues)}
            >
              <TabsList>
                <TabsTrigger value="random" className={cx('home__wrapper__content__main__tabs__trigger')}>
                  <IoShuffle /> {t('homepage.tabs.random')}
                </TabsTrigger>
                <TabsTrigger value="memorable" className={cx('home__wrapper__content__main__tabs__trigger')}>
                  <RiLightbulbLine /> {t('homepage.tabs.memorable')}
                </TabsTrigger>
                <TabsTrigger value="pin" className={cx('home__wrapper__content__main__tabs__trigger')}>
                  <PiHash /> {t('homepage.tabs.pin')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="random" className={cx('home__wrapper__content__main__tabs__content')}>
                <PasswordLength
                  passwordLength={password.length}
                  handleSetPassword={handleSetPassword}
                  min={defaultValues.min}
                  max={defaultValues.max}
                />
                <Separator />
                <PasswordConditions checkedConditions={checkedConditions} setCheckedConditions={setCheckedConditions} />
              </TabsContent>
              <TabsContent value="memorable" className={cx('home__wrapper__content__main__tabs__content')}>
                <PasswordLength
                  passwordLength={password.length}
                  handleSetPassword={handleSetPassword}
                  min={defaultValues.min}
                  max={defaultValues.max}
                />
                <Separator />
                <div className={cx('home__wrapper__content__main__tabs__content__options')}>
                  <p className={cx('home__wrapper__content__main__tabs__content__options__text')}>
                    {t('homepage.conditions.options')}:
                  </p>
                  <div className={cx('home__wrapper__content__main__tabs__content__options__option')}>
                    <Checkbox
                      id="allow-uppercase"
                      defaultChecked
                      checked={uppercaseFirstLetters}
                      onCheckedChange={(e) => setUppercaseFirstLetters(e as boolean)}
                    />
                    <label
                      htmlFor="allow-uppercase"
                      className={cx('home__wrapper__content__main__tabs__content__options__option__label')}
                    >
                      {t('homepage.conditions.capitalization')}
                    </label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pin" className={cx('home__wrapper__content__main__tabs__content')}>
                <PasswordLength
                  passwordLength={password.length}
                  handleSetPassword={handleSetPassword}
                  min={defaultValues.min}
                  max={defaultValues.max}
                />
              </TabsContent>
            </Tabs>
            <Separator />
            <div className={cx('home__wrapper__content__main__content')}>
              <PasswordArea
                password={password.value}
                passwordStrength={password.strength}
                refreshPassword={refreshPassword}
                rotate={rotate}
                displayBadge={defaultValues.tab === 'random'}
              />
              <div className={cx('home__wrapper__content__main__content__buttons')}>
                <ButtonCopy
                  password={password.value}
                  rotate={rotate}
                  className={cx('home__wrapper__content__main__content__buttons__button')}
                />

                <ComponentWithTooltip tooltip={t('homepage.tooltip.passwords')}>
                  <Button
                    size="icon"
                    onClick={() => setPasswordsModal(true)}
                    className={cx('home__wrapper__content__main__content__buttons__button')}
                  >
                    <IoKeyOutline />
                  </Button>
                </ComponentWithTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PasswordManager isOpen={passwordsModal} setIsOpen={setPasswordsModal} />
      <InfoDialog isOpen={infoDialog} setIsOpen={setInfoDialog} />
    </main>
  );
};

export default HomePage;
