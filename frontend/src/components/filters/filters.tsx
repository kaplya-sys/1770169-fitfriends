import {ChangeEvent, useEffect, useState} from 'react';
import Slider from 'rc-slider';

import {RangeFilter} from '../range-filter';
import {ExerciseFilter} from '../exercise-filter';
import {useAppDispatch} from '../../hooks';
import {getTrainingsAction} from '../../store';
import {
  ExerciseType,
  QueryType,
  RangeType,
  SortDirection,
  SortDirectionType,
  TrainingTime,
  TrainingTimeType
} from '../../libs/shared/types';
import {TRAINING_TIME_NAMES_WITH_LABEL} from '../../libs/shared/constants';

type FiltersPropsType = {
  priceRange: RangeType;
  caloryRange: RangeType;
  className: string;
  isCustom: boolean;
}

export const Filters = ({priceRange, caloryRange, className, isCustom}: FiltersPropsType) => {
  const [query, setQuery] = useState<QueryType>({
    priceMin: null,
    priceMax: null,
    caloriesMin: null,
    caloriesMax: null,
    ratingMin: null,
    ratingMax: null,
    type: [],
    trainingTime: null,
    orderByDate: null,
    orderByPrice: null
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrainingsAction({query}));
  }, [query, dispatch]);

  const handleRatingFilterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setQuery((prevState) => ({...prevState, ratingMin: value[0], ratingMax: value[1]}));
    }
  };
  const handlePriceFilterChange = (range: RangeType) => {
    setQuery((prevState) => ({...prevState, priceMin: range.min, priceMax: range.max}));
  };
  const handlePriceSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery((prevState) => ({...prevState, priceMin: null, priceMax: null, orderByPrice: evt.target.value as SortDirectionType}));
  };
  const handleTrainingTimeFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery((prevState) => ({...prevState, trainingTime: evt.target.value as TrainingTimeType}));
  };
  const handleCaloryFilterChange = (range: RangeType) => {
    setQuery((prevState) => ({...prevState, caloriesMin: range.min, caloriesMax: range.max}));
  };
  const handleFreeFilterChange = () => {
    setQuery((prevState) => ({...prevState, priceMin: 0, priceMax: 0, orderByPrice: null}));
  };
  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, checked} = evt.target;

    if (checked) {
      return setQuery((prevState) => ({...prevState, type: prevState.type?.concat(value as ExerciseType)}));
    }

    return setQuery((prevState) => ({...prevState, type: prevState.type?.filter((item) => item !== value)}));
  };

  return (
    <>
      <h3 className={`${className}__title`}>Фильтры</h3>
      <form className={`${className}__form`}>
        <RangeFilter
          blockClassName='price'
          title='Цена, ₽'
          priceRange={priceRange}
          onFilterChange={handlePriceFilterChange}
        />
        <RangeFilter
          blockClassName='calories'
          title='Калории'
          priceRange={caloryRange}
          onFilterChange={handleCaloryFilterChange}
        />
        <div className={`${className}__block ${className}__block--rating`}>
          <h4 className={`${className}__block-title`}>Рейтинг</h4>
          <Slider
            range
            className='rc-range'
            allowCross={false}
            min={0}
            max={5}
            defaultValue={[0, 5]}
            marks={{
              0: '0',
              5: '5',
            }}
            dotStyle={{display: 'none'}}
            onChange={handleRatingFilterChange}
          />
        </div>
        {isCustom ?
          <div className={`${className}__block ${className}__block--duration`}>
            <h4 className={`${className}__block-title`}>Длительность</h4>
            <ul className={`${className}__check-list`}>
              {Object.values(TrainingTime).map((trainingTime) => (
                <li className={`${className}__check-list-item`} key={trainingTime}>
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={trainingTime}
                        name="duration"
                        checked={trainingTime === query.trainingTime}
                        onChange={handleTrainingTimeFilterChange}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{TRAINING_TIME_NAMES_WITH_LABEL[trainingTime]}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div> :
          <>
            <ExerciseFilter onFilterChange={handleSpecializationChange} />
            <div className={`${className}__block ${className}__block--sort`}>
              <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
              <div className="btn-radio-sort gym-catalog-form__radio">
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value={SortDirection.Up}
                    checked={SortDirection.Up === query.orderByPrice}
                    onChange={handlePriceSortChange}
                  />
                  <span className="btn-radio-sort__label">Дешевле</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value={SortDirection.Down}
                    checked={SortDirection.Down === query.orderByPrice}
                    onChange={handlePriceSortChange}
                  />
                  <span className="btn-radio-sort__label">Дороже</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    checked={query.priceMin === 0 && query.priceMax === 0}
                    onChange={handleFreeFilterChange}
                  />
                  <span className="btn-radio-sort__label">Бесплатные</span>
                </label>
              </div>
            </div>
          </>}
      </form>
    </>
  );
};
