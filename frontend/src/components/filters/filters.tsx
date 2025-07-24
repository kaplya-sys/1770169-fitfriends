import { ChangeEvent, useEffect, useState } from 'react';
import Slider from 'rc-slider';

import { Range, SortType, Specialization } from '@fitfriends/lib/shared/types';

import { RangeFilter } from '../range-filter';
import { SpecializationsFilter } from '../specializations-filter';
import { useAppDispatch } from '../../hooks';
import { getTrainingsAction } from '../../store';
import { Query } from '../../lib/shared/types';
import { FiltersPropsType } from './filters-props.type';

export const Filters = ({ priceRange, caloryRange }: FiltersPropsType) => {
  const [query, setQuery] = useState<Query>({
    filterCalory: null,
    filterPrice: null,
    filterRating: null,
    filterFree: false,
    filterType: [],
    orderPrice: ''
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrainingsAction({ query }));
  }, [query, dispatch]);

  const handleRatingFilterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setQuery((prevState) => ({
        ...prevState,
        filterRating: {
          min: value[0],
          max: value[1]
        }
      }));
    }
  };

  const handlePriceFilterChange = (range: Range) => {
    setQuery((prevState) => ({
      ...prevState,
      filterPrice: range
    }));
  };

  const handlePriceSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery((prevState) => ({
      ...prevState,
      orderPrice: evt.target.value
    }));

    setQuery((prevState) => ({
      ...prevState,
      filterFree: false
    }));
  };

  const handleCaloryFilterChange = (range: Range) => {
    setQuery((prevState) => ({
      ...prevState,
      filterCalory: range
    }));
  };

  const handleFreeFilterChange = () => {
    setQuery((prevState) => ({
      ...prevState,
      filterFree: true
    }));

    setQuery((prevState) => ({
      ...prevState,
      orderPrice: ''
    }));

    setQuery((prevState) => ({
      ...prevState,
      filterPrice: null
    }));
  };

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = evt.target;

    if (checked) {
      setQuery((prevState) => ({
        ...prevState,
        filterType: prevState.filterType?.concat(value as Specialization)
      }));
    }
  };

  return (
    <>
      <h3 className="gym-catalog-form__title">Фильтры</h3>
      <form className="gym-catalog-form__form">
        <RangeFilter
          blockClassName='price'
          title='Цена, ₽'
          priceRange={ priceRange }
          onFilterChange={ handlePriceFilterChange }
        />
        <RangeFilter
          blockClassName='calories'
          title='Калории'
          priceRange={ caloryRange }
          onFilterChange={ handleCaloryFilterChange }
        />
        <div className="gym-catalog-form__block gym-catalog-form__block--rating">
          <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
          <Slider
            range
            className='rc-range'
            allowCross={ false }
            min={ 1 }
            max={ 5 }
            defaultValue={ [1, 5] }
            marks={{
              1: '1',
              5: '5',
            }}
            dotStyle={{ display: 'none' }}
            onChange={ handleRatingFilterChange }
          />
        </div>
        <SpecializationsFilter onFilterChange={ handleSpecializationChange } />
        <div className="gym-catalog-form__block gym-catalog-form__block--sort">
          <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
          <div className="btn-radio-sort gym-catalog-form__radio">
            <label>
              <input
                type="radio"
                name="sort"
                value={ SortType.Asc }
                checked={ SortType.Asc === query.orderPrice as SortType }
                onChange={ handlePriceSortChange }
              />
              <span className="btn-radio-sort__label">Дешевле</span>
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value={ SortType.Desc }
                checked={ SortType.Desc === query.orderPrice as SortType }
                onChange={ handlePriceSortChange }
              />
              <span className="btn-radio-sort__label">Дороже</span>
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                checked={ query.filterFree }
                onChange={ handleFreeFilterChange }
              />
              <span className="btn-radio-sort__label">Бесплатные</span>
            </label>
          </div>
        </div>
      </form>
    </>
  );
};
