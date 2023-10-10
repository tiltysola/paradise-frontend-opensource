import classNames from 'classnames';

import './style.less';

interface Props {
  children?: JSX.Element | JSX.Element[];
  className?: string;
}

function Section(props: Props) {
  const { children, className } = props;

  return (
    <div className={classNames('section', className)}>
      <div className="container">{children}</div>
    </div>
  );
}

export default Section;
