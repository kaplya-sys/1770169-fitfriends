import { useNavigate } from 'react-router-dom';

import { BackButtonPropsType } from './back-button-props.type';

export const BackButton = ({ blockClassName }:BackButtonPropsType) => {
  const navigate = useNavigate();

  return (
    <button
      className={`btn-flat btn-flat--underlined ${ blockClassName }`}
      type="button"
      onClick={ () => navigate(-1) }
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg>
      <span>Назад</span>
    </button>
  );
};
