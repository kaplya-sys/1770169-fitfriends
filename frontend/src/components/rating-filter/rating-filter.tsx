import Slider from 'rc-slider';

type RatingFilterPropsType = {
  className: string;
  minRange: number;
  maxRange: number;
  onFilterChange: (value: number | number[]) => void;
}

export const RatingFilter = ({className, minRange, maxRange, onFilterChange}: RatingFilterPropsType) => (
  <div className={`${className}__block ${className}__block--rating`}>
    <h4 className={`${className}__block-title`}>Рейтинг</h4>
    <Slider
      range
      className='rc-range'
      allowCross={false}
      min={minRange}
      max={maxRange}
      defaultValue={[minRange, maxRange]}
      marks={{
        [minRange]: minRange,
        [maxRange]: maxRange,
      }}
      dotStyle={{display: 'none'}}
      onChange={onFilterChange}
    />
  </div>
);
