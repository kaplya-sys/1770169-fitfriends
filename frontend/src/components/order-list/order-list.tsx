import {TrainingCard} from '../training-card';
import {OrderType} from '../../libs/shared/types';

type OrderListPropsType = {
  orders: OrderType[];
  className: string;
}

export const OrderList = ({orders, className}: OrderListPropsType) => (
  <ul className={`${className}__list`}>
    {
      orders.map((order) => (
        <TrainingCard
          key={order.id}
          training={order.training}
          className={className}
          orderInfo={{
            count: order.count,
            amount: order.amount
          }}
        />
      ))
    }
  </ul>
);
