import {ChangeEvent, useEffect, useState} from 'react';
import Slider from 'rc-slider';

import {RangeFilter} from '../range-filter';
import {ExerciseFilter} from '../exercise-filter';
import {useAppDispatch} from '../../hooks';
import {getTrainingsAction} from '../../store';
import {ExerciseType, QueryType, RangeType, SortDirection, SortDirectionType} from '../../libs/shared/types';

type FiltersPropsType = {
  priceRange: RangeType;
  caloryRange: RangeType;
}

export const Filters = ({priceRange, caloryRange}: FiltersPropsType) => {
  //const [isFree, setIsFree] = useState<boolean>(false);
  const [query, setQuery] = useState<QueryType>({
    priceMin: null,
    priceMax: null,
    caloriesMin: null,
    caloriesMax: null,
    ratingMin: null,
    ratingMax: null,
    type: [],
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
      <h3 className="gym-catalog-form__title">Фильтры</h3>
      <form className="gym-catalog-form__form">
        <RangeFilter
          blockClassName='price'
          title='Цена, ₽'
          priceRange={priceRange}
          onFilterChange={ handlePriceFilterChange }
        />
        <RangeFilter
          blockClassName='calories'
          title='Калории'
          priceRange={caloryRange}
          onFilterChange={ handleCaloryFilterChange }
        />
        <div className="gym-catalog-form__block gym-catalog-form__block--rating">
          <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
          <Slider
            range
            className='rc-range'
            allowCross={false}
            min={1}
            max={5}
            defaultValue={[1, 5]}
            marks={{
              1: '1',
              5: '5',
            }}
            dotStyle={{display: 'none'}}
            onChange={handleRatingFilterChange}
          />
        </div>
        <ExerciseFilter onFilterChange={handleSpecializationChange} />
        <div className="gym-catalog-form__block gym-catalog-form__block--sort">
          <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
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
      </form>
    </>
  );
};
