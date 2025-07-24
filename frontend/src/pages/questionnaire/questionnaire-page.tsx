import { ChangeEvent, FormEvent, useState } from 'react';

import {
  Questionnaire,
  Level,
  TrainingTime,
  Specialization,
  Role
} from '@fitfriends/lib/shared/types';

import { Logo } from '../../components/logo';
import { PopupForm } from '../../components/popup-form';
import { CustomRadioGroup } from '../../ui/custom-radio-group';
import { SpecializationsGroup } from '../../components/specializations-group';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createQuestionnaireAction, selectUser } from '../../store';
import {
  AttributeName,
  LEVEL_OPTIONS,
  SPECIALIZATION_OPTIONS,
  TRAINING_TIME_OPTIONS
} from '../../lib/shared/constants';
import { CustomInput } from '../../ui/custom-input';

export const QuestionnairePage = () => {
  const [data, setData] = useState<Questionnaire>({
    level: '' as Level,
    specializations: [],
    trainingTime: '' as TrainingTime,
    calorieLose: 0,
    calorieWaste: 0,
    isReady: false
  });
  const [error, setError] = useState({
    calorieLose: '',
    calorieWaste: '',
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(createQuestionnaireAction(data));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = evt.target;
    setData((prevState) => {
      if (name === AttributeName.CALORIES_LOSE) {
        return { ...prevState, calorieLose: parseInt(value, 10) };
      }

      if (name === AttributeName.CALORIES_WASTE) {
        return { ...prevState, calorieWaste: parseInt(value, 10) };
      }

      if (name === AttributeName.SPECIALIZATION) {
        if (checked) {
          return {
            ...prevState,
            specializations: prevState.specializations?.concat(value as Specialization)
          };
        }

        return {
          ...prevState,
          specializations: prevState.specializations?.filter((item) => item !== value)
        };
      }

      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="wrapper">
      <main>
        <Logo />
        <PopupForm
          blockClassName='questionnaire-user'
          onFormSubmit={ handleFormSubmit }
        >
          <h1 className="visually-hidden">Опросник</h1>
          <div className="questionnaire-user__wrapper">
            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
              <SpecializationsGroup
                blockClassName='questionnaire-user'
                options={ SPECIALIZATION_OPTIONS }
                selectedValue={ data.specializations as Specialization[] }
                isDisabled={ false }
                onInputChange={ handleInputChange }
              />
            </div>
            {
              user?.role === Role.Sportsman &&
                <div className="questionnaire-user__block">
                  <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                  <CustomRadioGroup
                    className='questionnaire-user__radio'
                    options={ TRAINING_TIME_OPTIONS }
                    selectedValue={ data.trainingTime as string }
                    onInputChange={ handleInputChange }
                  />
                </div>
            }
            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Ваш уровень</span>
              <CustomRadioGroup
                className='questionnaire-user__radio'
                options={ LEVEL_OPTIONS }
                selectedValue={ data.level as string }
                onInputChange={ handleInputChange }
              />
            </div>
            {
              user?.role === Role.Sportsman &&
              <div className="questionnaire-user__block">
                <div className="questionnaire-user__calories-lose">
                  <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                  <CustomInput
                    type='number'
                    name='calories-lose'
                    value={ data.calorieLose }
                    errorMessage={ error.calorieLose }
                    fieldText='ккал'
                    textPosition='right'
                    className='questionnaire-user__input'
                    onChange={ handleInputChange }
                  />
                </div>
                <div className="questionnaire-user__calories-waste">
                  <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                  <CustomInput
                    type='number'
                    name='calories-waste'
                    value={ data.calorieWaste }
                    errorMessage={ error.calorieWaste }
                    fieldText='ккал'
                    textPosition='right'
                    className='questionnaire-user__input'
                    onChange={ handleInputChange }
                  />
                </div>
              </div>
            }
          </div>
        </PopupForm>
      </main>
    </div>
  );
};
