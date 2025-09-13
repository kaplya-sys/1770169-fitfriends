import {ChangeEvent, useEffect, useState} from 'react';
import classNames from 'classnames';

import {RangeFilter} from '../range-filter';
import {
  Exercise,
  FilterName,
  FilterNameType,
  FitnessLevel,
  Location,
  QueryType,
  RangeType,
  Role,
  SortDirection,
  SortDirectionType,
  TrainingTime
} from '../../libs/shared/types';
import {
  DEFAULT_ELEMENTS_VIEW,
  EXERCISE_NAMES,
  FITNESS_LEVEL_NAME,
  LOCATION_NAME,
  ROLE_NAME,
  TRAINING_TIME_NAMES_WITH_LABEL
} from '../../libs/shared/constants';
import {RatingFilter} from '../rating-filter';
import {useDebounce} from '../../hooks';

type FilterPropsType = {
  className: string;
  filterName: FilterNameType;
  filters: QueryType;
  onFilterChange: (filters: QueryType) => void;
  priceRange?: RangeType;
  caloryRange?: RangeType;
}

export const Filter = ({
  className,
  filterName,
  filters,
  onFilterChange,
  priceRange = {min: 0, max: 0},
  caloryRange = {min: 0, max: 0}
}: FilterPropsType) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [showMoreLocation, setShowMoreLocation] = useState<boolean>(false);
  const [showMoreExercise, setShowMoreExercise] = useState<boolean>(false);
  const debouncedFilters = useDebounce(localFilters);
  const locations = Object.values(Location);
  const exercises = Object.values(Exercise);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  const handleRatingFilterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalFilters((prevState) => ({...prevState, ratingMin: value[0], ratingMax: value[1]}));
    }
  };
  const handlePriceFilterChange = (range: RangeType) => {
    setLocalFilters((prevState) => ({...prevState, priceMin: range.min, priceMax: range.max}));
  };
  const handleCaloryFilterChange = (range: RangeType) => {
    setLocalFilters((prevState) => ({...prevState, caloriesMin: range.min, caloriesMax: range.max}));
  };
  const handlePriceSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prevState) => ({...prevState, priceMin: null, priceMax: null, orderByPrice: evt.target.value as SortDirectionType}));
  };
  const handleFreeSortChange = () => {
    setLocalFilters((prevState) => ({...prevState, priceMin: 0, priceMax: 0, orderByPrice: null}));
  };
  const handleFilterListChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value, checked} = evt.target;

    setLocalFilters((prevState) => {
      if (name in prevState && Array.isArray(prevState[name as keyof QueryType])) {
        const key = name as keyof QueryType;
        const currentArray = prevState[key] as string[];

        if (checked) {
          return {...prevState, [key]: currentArray.concat(value)};
        }

        return {...prevState, [key ]: currentArray.filter((item) => item !== value)};
      }

      return prevState;
    });
  };
  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setLocalFilters((prevState) => ({...prevState, [name]: value}));
  };
  const handleShowMoreLocationClick = () => {
    setShowMoreLocation((prevState) => !prevState);
  };
  const handleShowMoreExerciseClick = () => {
    setShowMoreExercise((prevState) => !prevState);
  };

  return (
    <>
      <h3 className={`${className}__title`}>Фильтры</h3>
      <form className={`${className}__form`}>
        {
          (filterName === FilterName.TrainingFilter || filterName === FilterName.MyTrainingFilter) &&
            <>
              <RangeFilter
                className={className}
                modifier='price'
                title='Цена, ₽'
                priceRange={priceRange}
                onFilterChange={handlePriceFilterChange}
              />
              <RangeFilter
                className={className}
                modifier='calories'
                title='Калории'
                priceRange={caloryRange}
                onFilterChange={handleCaloryFilterChange}
              />
              <RatingFilter
                className={className}
                minRange={0}
                maxRange={5}
                onFilterChange={handleRatingFilterChange}
              />
            </>
        }
        {
          filterName === FilterName.MyTrainingFilter &&
            <div className={`${className}__block ${className}__block--duration`}>
              <h4 className={`${className}__block-title`}>Длительность</h4>
              <ul className={`${className}__check-list`}>
                {
                  Object.values(TrainingTime).map((trainingTime) => (
                    <li className={`${className}__check-list-item`} key={trainingTime}>
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value={trainingTime}
                            name="trainingTime"
                            checked={localFilters.trainingTime?.includes(trainingTime)}
                            onChange={handleFilterListChange}
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
                  ))
                }
              </ul>
            </div>
        }
        {
          (filterName === FilterName.UserFilter) &&
            <div className={`${className}__block ${className}__block--location`}>
              <h4 className={`${className}__block-title`}>Локация, станция метро</h4>
              <ul className={`${className}__check-list`}>
                {
                  locations.slice(0, showMoreLocation ? undefined : DEFAULT_ELEMENTS_VIEW).map((location) => (
                    <li className={`${className}__check-list-item`} key={location}>
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value={location}
                            name="location"
                            checked={filters.location?.includes(location)}
                            onChange={handleFilterListChange}
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">{LOCATION_NAME[location]}</span>
                        </label>
                      </div>
                    </li>
                  ))
                }
              </ul>
              {
                locations.length > DEFAULT_ELEMENTS_VIEW &&
                  <button
                    className={`btn-show-more ${className}__btn-show`}
                    type="button"
                    onClick={handleShowMoreLocationClick}
                  >
                    <span>{showMoreLocation ? 'Скрыть' : 'Посмотреть все'}</span>
                    <svg className="btn-show-more__icon" style={showMoreLocation ? {rotate: '180deg'} : {rotate: '0deg'}} width="10" height="4" aria-hidden="true">
                      <use xlinkHref="#arrow-down"></use>
                    </svg>
                  </button>
              }
            </div>
        }
        {
          (filterName === FilterName.TrainingFilter || filterName === FilterName.UserFilter) &&
            <div className={classNames(`${className}__block`, {
              [`${className}__block--type`]: filterName === FilterName.TrainingFilter,
              [`${className}__block--spezialization`]: filterName === FilterName.UserFilter
            })}
            >
              <h4 className={`${className}__block-title`}>{filterName === FilterName.TrainingFilter ? 'Тип' : 'Специализация'}</h4>
              <ul className={`${className}__check-list`}>
                {
                  exercises.slice(0, showMoreExercise ? undefined : DEFAULT_ELEMENTS_VIEW).map((exercise) => (
                    <li className={`${className}__check-list-item`} key={exercise}>
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value={exercise}
                            name="type"
                            checked={localFilters.type?.includes(exercise)}
                            onChange={handleFilterListChange}
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">{EXERCISE_NAMES[exercise]}</span>
                        </label>
                      </div>
                    </li>
                  ))
                }
              </ul>
              {
                filterName === FilterName.UserFilter && exercises.length > DEFAULT_ELEMENTS_VIEW &&
                  <button
                    className={`btn-show-more ${className}__btn-show`}
                    type="button"
                    onClick={handleShowMoreExerciseClick}
                  >
                    <span>{showMoreExercise ? 'Скрыть' : 'Посмотреть все'}</span>
                    <svg className="btn-show-more__icon" style={showMoreExercise ? {rotate: '180deg'} : {rotate: '0deg'}} width="10" height="4" aria-hidden="true">
                      <use xlinkHref="#arrow-down"></use>
                    </svg>
                  </button>
              }
            </div>
        }
        {
          filterName === FilterName.TrainingFilter &&
            <div className={`${className}__block ${className}__block--sort`}>
              <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
              <div className={`btn-radio-sort ${className}__radio`}>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value={SortDirection.Up}
                    checked={SortDirection.Up === localFilters.orderByPrice}
                    onChange={handlePriceSortChange}
                  />
                  <span className="btn-radio-sort__label">Дешевле</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value={SortDirection.Down}
                    checked={SortDirection.Down === localFilters.orderByPrice}
                    onChange={handlePriceSortChange}
                  />
                  <span className="btn-radio-sort__label">Дороже</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    checked={localFilters.priceMin === 0 && localFilters.priceMax === 0}
                    onChange={handleFreeSortChange}
                  />
                  <span className="btn-radio-sort__label">Бесплатные</span>
                </label>
              </div>
            </div>
        }
        {
          filterName === FilterName.UserFilter &&
            <>
              <div className={`${className}__block ${className}__block--level`}>
                <h4 className={`${className}__title`}>Ваш уровень</h4>
                <div className="custom-toggle-radio">
                  {Object.values(FitnessLevel).map((fitnessLevel) => (
                    <div className="custom-toggle-radio__block" key={fitnessLevel}>
                      <label>
                        <input
                          type="radio"
                          name="fitnessLevel"
                          value={fitnessLevel}
                          checked={localFilters.fitnessLevel === fitnessLevel}
                          onChange={handleFilterChange}
                        />
                        <span className="custom-toggle-radio__icon"></span>
                        <span className="custom-toggle-radio__label">{FITNESS_LEVEL_NAME[fitnessLevel]}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${className}__block`}>
                <h3 className={`${className}__title ${className}__title--sort`}>Сортировка</h3>
                <div className="btn-radio-sort">
                  {Object.values(Role).map((role) => (
                    <label key={role}>
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={role === localFilters.role}
                        onChange={handleFilterChange}
                      />
                      <span className="btn-radio-sort__label">{ROLE_NAME[role]}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
        }
      </form>
    </>
  );
};
