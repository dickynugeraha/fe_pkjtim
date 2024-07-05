import clsx from 'clsx';
import { useLayout } from '../../core';
import { Footer } from './Footer';

const FooterWrapper = () => {
  const { config } = useLayout();
  if (!config.app?.footer?.display) {
    return null;
  }

  return (
    <>
      <div
        className='app-footer mt-5 bg-white theme-light-show'
        id='kt_app_footer'
      >
        {config.app.footer.containerClass ? (
          <div
            className={clsx(
              'app-container',
              config.app.footer.container === 'fixed'
                ? 'container-xxl'
                : 'container-fluid',
              config.app.footer.containerClass
            )}
          >
            <Footer />
          </div>
        ) : (
          <Footer />
        )}
      </div>
      <div
        className='app-footer mt-5 theme-dark-show'
        id='kt_app_footer'
      >
        {config.app.footer.containerClass ? (
          <div
            className={clsx(
              'app-container',
              config.app.footer.container === 'fixed'
                ? 'container-xxl'
                : 'container-fluid',
              config.app.footer.containerClass
            )}
          >
            <Footer />
          </div>
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
};

export { FooterWrapper };
