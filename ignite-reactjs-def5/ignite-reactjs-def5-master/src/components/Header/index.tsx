import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/" passHref>
          <div>
            <Image src="/Logo.svg" alt="logo" width="239" height="26" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
