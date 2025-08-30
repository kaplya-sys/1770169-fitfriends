type ShowMoreProps = {
  className: string;
  totalPages: number;
  currentPage: number;
  onClickShowMore: () => void;
  onClickBackBeginning: () => void;
}

export const ShowMore = ({className, totalPages, currentPage, onClickShowMore, onClickBackBeginning}: ShowMoreProps) => (
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
          onClick={onClickBackBeginning}
        >
          Вернуться в начало
        </button>
    }
  </div>
);
