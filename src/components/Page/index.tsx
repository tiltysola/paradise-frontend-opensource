import classNames from 'classnames';

import './style.less';

interface Props {
  title?: string | JSX.Element;
  content?: string;
  children?: JSX.Element | JSX.Element[];
  withoutBg?: boolean;
  className?: string;
}

const Index = (props: Props) => {
  const {
    title = '缇尔蒂',
    content = '缇尔蒂',
    children,
    withoutBg,
    className,
  } = props;

  return (
    <div
      className={classNames(
        'page',
        {
          'without-bg': withoutBg,
        },
        className,
      )}
    >
      <div className="page-slider">
        <div className="container">
          <h1 className="page-slider-title">{title}</h1>
          <h2 className="page-slider-content">{content}</h2>
        </div>
      </div>
      <div className="page-content">{children}</div>
    </div>
  );
};

export default Index;
