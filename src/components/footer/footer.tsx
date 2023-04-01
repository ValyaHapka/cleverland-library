import React from 'react';

import { logos } from '../../assets/json/logos';

import styles from './footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.footer_rights}>© 2020-2023 Cleverland. Все права защищены.</p>
    <ul className={styles.footer_social}>
      {logos.map((l) => (
        <li className={styles.footer_social_logo} key={l.name}>
          <img src={l.logo} alt={l.name} />
        </li>
      ))}
    </ul>
  </footer>
);
