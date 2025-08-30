import {ChangeEvent, FormEvent, useState} from 'react';

import {
  CreateQuestionnaireType,
  Exercise,
  ExerciseType,
  FitnessLevel,
  TrainingTime,
  Role
} from '../../libs/shared/types';
import {
  AttributeName,
  EXERCISE_NAMES,
  FITNESS_LEVEL_NAME,
  TRAINING_TIME_NAMES
} from '../../libs/shared/constants';
import {validateFields} from '../../libs/shared/helpers';
import {Logo} from '../../components/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {createQuestionnaireAction, selectAuthenticatedUser} from '../../store';
import {CustomInput} from '../../ui/custom-input';
import {CustomTextarea} from '../../ui/custom-textarea';

export const QuestionnairePage = () => {
  const [data, setData] = useState<CreateQuestionnaireType>({
    exercises: [],
    fitnessLevel: '',
    trainingTime: '',
    caloriesLose: '',
    caloriesWaste: '',
    qualifications: null,
    experience: '',
    isPersonal: false
  });
  const [error, setError] = useState<Partial<Record<keyof CreateQuestionnaireType, string>>>({});
  const dispatch = useAppDispatch();
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);

  if (!authenticatedUser) {
    return null;
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();

    if (authenticatedUser.role === Role.Coach) {
      const {exercises, fitnessLevel, qualifications, experience, isPersonal} = data;
      const newError = validateFields({
        qualifications,
        experience,
        isPersonal,
        fitnessLevel,
        exercises
      });

      if (!newError) {
        for (const exercise of data.exercises) {
          formData.append('exercises', exercise);
        }
        formData.append('fitnessLevel', data.fitnessLevel);
        formData.append('experience', data.experience);
        formData.append('isPersonal', String(data.isPersonal));

        if (data.qualifications !== null) {
          for (let i = 0; i < data.qualifications.length; i++) {
            formData.append('qualification', data.qualifications[i]);
          }
        }

        dispatch(createQuestionnaireAction(formData));
      } else {
        setError(newError);
      }

      return;
    }
    const {exercises, fitnessLevel, trainingTime, caloriesLose, caloriesWaste} = data;
    const newError = validateFields({
      trainingTime,
      caloriesLose,
      caloriesWaste,
      fitnessLevel,
      exercises
    });

    if (!newError) {
      for (const exercise of data.exercises) {
        formData.append('exercises', exercise);
      }
      formData.append('fitnessLevel', data.fitnessLevel);
      formData.append('trainingTime', data.trainingTime);
      formData.append('caloriesLose', data.caloriesLose);
      formData.append('caloriesWaste', data.caloriesWaste);

      dispatch(createQuestionnaireAction(formData));
    } else {
      setError(newError);
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (evt.target instanceof HTMLTextAreaElement) {
      return setData((prevState) => ({...prevState, experience: evt.target.value}));
    }

    if (evt.target instanceof HTMLInputElement) {
      const {value, name, checked, files} = evt.target;
      setData((prevState) => {
        if (name === AttributeName.INDIVIDUAL_TRAINING) {
          return {...prevState, isPersonal: !prevState.isPersonal};
        }

        if (name === AttributeName.EXERCISES) {
          if (checked && data.exercises?.length < 3) {
            return {
              ...prevState,
              exercises: prevState.exercises?.concat(value as ExerciseType)
            };
          }

          return {
            ...prevState,
            exercises: prevState.exercises?.filter((item) => item !== value)
          };
        }

        if (files?.length) {
          return {...prevState, qualifications: files};
        }

        return {...prevState, [name]: value};
      });
    }
  };

  return (
    <div className="wrapper">
      <main>
        <Logo />
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form onSubmit={handleFormSubmit}>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          {Object.values(Exercise).map((exercise) => (
                            <div className="btn-checkbox" key={exercise}>
                              <label>
                                <input
                                  className="visually-hidden"
                                  type="checkbox"
                                  name="exercises"
                                  value={exercise}
                                  checked= {data.exercises.includes(exercise)}
                                  onChange={handleInputChange}
                                />
                                <span className="btn-checkbox__btn">{EXERCISE_NAMES[exercise]}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {
                        authenticatedUser.role === Role.User &&
                        <div className="questionnaire-user__block">
                          <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                          <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                            {Object.values(TrainingTime).map((trainingTime) => (
                              <div className="custom-toggle-radio__block" key={trainingTime}>
                                <label>
                                  <input
                                    type="radio"
                                    name="trainingTime"
                                    value={trainingTime}
                                    checked={data.trainingTime === trainingTime}
                                    onChange={handleInputChange}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">{TRAINING_TIME_NAMES[trainingTime]}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {Object.values(FitnessLevel).map((fitnessLevel) => (
                            <div className="custom-toggle-radio__block" key={fitnessLevel}>
                              <label>
                                <input
                                  type="radio"
                                  name="fitnessLevel"
                                  value={fitnessLevel}
                                  checked={data.fitnessLevel === fitnessLevel}
                                  onChange={handleInputChange}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{FITNESS_LEVEL_NAME[fitnessLevel]}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {
                        authenticatedUser.role === Role.User ?
                          <div className="questionnaire-user__block">
                            <div className="questionnaire-user__calories-lose">
                              <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                              <CustomInput
                                type='number'
                                name='caloriesLose'
                                value={data.caloriesLose}
                                errorMessage={error.caloriesLose}
                                fieldText='ккал'
                                textPosition='right'
                                className='questionnaire-user__input'
                                onInputChange={handleInputChange}
                              />
                            </div>
                            <div className="questionnaire-user__calories-waste">
                              <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                              <CustomInput
                                type='number'
                                name='caloriesWaste'
                                value={data.caloriesWaste}
                                errorMessage={error.caloriesWaste}
                                fieldText='ккал'
                                textPosition='right'
                                className='questionnaire-user__input'
                                onInputChange={handleInputChange}
                              />
                            </div>
                          </div> :
                          <>
                            <div className="questionnaire-coach__block">
                              <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                              <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                                <label>
                                  <span className="drag-and-drop__label" tabIndex={0}>
                                    Загрузите сюда файлы формата PDF, JPG или PNG
                                    <svg width="20" height="20" aria-hidden="true">
                                      <use xlinkHref="#icon-import"></use>
                                    </svg>
                                  </span>
                                  <input
                                    type="file"
                                    name="qualifications"
                                    tabIndex={-1}
                                    accept=".pdf, .jpg, .png"
                                    multiple
                                    onChange={handleInputChange}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="questionnaire-coach__block">
                              <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                              <CustomTextarea
                                className='questionnaire-coach__textarea'
                                name='experience'
                                value={data.experience}
                                errorMessage={error.experience}
                                onTextareaChange={handleInputChange}
                              />
                              <div className="questionnaire-coach__checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    value="individual-training"
                                    name="individual-training"
                                    checked={data.isPersonal}
                                    onChange={handleInputChange}
                                  />
                                  <span className="questionnaire-coach__checkbox-icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span>
                                  <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                                </label>
                              </div>
                            </div>
                          </>
                      }
                    </div>
                    <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
