type ShowMoreProps = {
  className: string;
  totalPages: number;
  currentPage: number;
  onClickShowMore: () => void;
}

export const ShowMore = ({className, totalPages, currentPage, onClickShowMore}: ShowMoreProps) => {
  const handleBackBeginningClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`show-more ${className}__show-more`}>
      {
        totalPages !== currentPage ?
          <button
            className="btn show-more__button show-more__button--more"
            type="button"
            onClick={onClickShowMore}
          >
            Показать еще
          </button> :
          <button
            className="btn show-more__button"
            type="button"
            onClick={handleBackBeginningClick}
          >
            Вернуться в начало
          </button>
      }
    </div>
  );
};
