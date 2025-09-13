import {useNavigate} from 'react-router-dom';

type BackButtonPropsType = {
  className: string;
}

export const BackButton = ({className}:BackButtonPropsType) => {
  const navigate = useNavigate();

  return (
    <button
      className={`btn-flat ${className}`}
      type="button"
      onClick={() => navigate(-1)}
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg>
      <span>Назад</span>
    </button>
  );
};
