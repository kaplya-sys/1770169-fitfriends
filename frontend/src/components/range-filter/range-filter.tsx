import {ChangeEvent, useState} from 'react';
import Slider from 'rc-slider';

import {RangeType} from '../../libs/shared/types';

import './range-filter.css';

type RangeFilterPropsType = {
  className: string;
  modifier: string;
  title: string;
  priceRange: RangeType;
  onFilterChange?: (range: RangeType) => void;
}

export const RangeFilter = ({className, modifier, title, priceRange, onFilterChange}: RangeFilterPropsType) => {
  const [range, setRange] = useState<RangeType>(priceRange);

  const handleInputChange = (type: 'min' | 'max', evt: ChangeEvent<HTMLInputElement>) => {
    setRange((prevState) => ({...prevState, [type]: parseInt(evt.target.value, 10)}));

    if (onFilterChange) {
      onFilterChange(range);
    }
  };

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRange({
        min: value[0],
        max: value[1]
      });
    }

    if (onFilterChange) {
      onFilterChange(range);
    }
  };

  return (
    <div className={`${className}__block ${className}__block--${modifier}`}>
      <h4 className={`${className}__block-title`}>{title}</h4>
      <div className={`filter-${modifier}`}>
        <div className={`filter-${modifier}__input-text filter-${modifier}__input-text--min`}>
          <input
            min={priceRange.min}
            max={priceRange.max}
            value={range.min}
            type="number"
            id="text-min-cal"
            name="text-min-cal"
            placeholder={priceRange.min.toString()}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => handleInputChange('min', evt)}
          />
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className={`filter-${modifier}__input-text filter-${modifier}__input-text--max`}>
          <input
            min={priceRange.min}
            max={priceRange.max}
            value={range.max}
            type="number"
            id="text-max-cal"
            name="text-max-cal"
            placeholder={priceRange.max.toString()}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => handleInputChange('max', evt)}
          />
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>
      <Slider
        range
        allowCross={false}
        min={priceRange.min}
        max={priceRange.max}
        defaultValue={[priceRange.min, priceRange.max]}
        onChange={handleRangeChange}
      />
    </div>
  );
};
