import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';

import {Layout} from '../../components/layout';
import {CustomInput} from '../../ui/custom-input';
import {
  EXERCISE_NAMES,
  FITNESS_LEVEL_NAME,
  GENDER_NAME,
  TRAINING_TIME_NAMES
} from '../../libs/shared/constants';
import {CustomTextarea} from '../../ui/custom-textarea';
import {
  CreateTrainingType,
  Exercise,
  ExerciseType,
  FitnessLevel,
  FitnessLevelType,
  Gender,
  TrainingTime,
  TrainingTimeType
} from '../../libs/shared/types';
import {CustomSelect} from '../../ui/custom-select';
import {isErrorObject, validateFields} from '../../libs/shared/helpers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {createTrainingAction, selectTrainingError} from '../../store';

export const CreateTraining = () => {
  const [data, setData] = useState<CreateTrainingType>({
    title: '',
    type: '',
    trainingDescription: '',
    trainingTime: '',
    fitnessLevel: '',
    gender: '',
    caloriesWaste: '',
    price: '',
    video: null
  });
  const [error, setError] = useState<Partial<Record<keyof CreateTrainingType, string>>>({});
  const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false);
  const [isTrainingTimeOpen, setIsTrainingTimeOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
  const trainingError = useAppSelector(selectTrainingError);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isErrorObject(trainingError) && trainingError.statusCode === 400) {
      for (const message of trainingError.message) {
        const field = message.split(' ')[0];
        setError((prevState) => ({...prevState, [field]: message}));
      }
    }
  }, [trainingError]);

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
    setError((prevState) => ({...prevState, [name]: ''}));
  };
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {files} = evt.target;

    if (files?.length) {
      setData((prevState) =>({...prevState, video: files[0]}));
    }
  };
  const handleTypeSelectClick = () => {
    setIsTypeOpen((prevState) => !prevState);
  };
  const handleTrainingTimeSelectClick = () => {
    setIsTrainingTimeOpen((prevState) => !prevState);
  };
  const handleLevelSelectClick = () => {
    setIsLevelOpen((prevState) => !prevState);
  };
  const handleTypeClick = (type: ExerciseType) => {
    setData((prevState) => ({...prevState, type}));
    setError((prevState) => ({...prevState, type: ''}));
    setIsTypeOpen((prevState) => !prevState);
  };
  const handleTrainingTimeClick = (trainingTime: TrainingTimeType) => {
    setData((prevState) => ({...prevState, trainingTime}));
    setError((prevState) => ({...prevState, trainingTime: ''}));
    setIsTrainingTimeOpen((prevState) => !prevState);
  };
  const handleLevelClick = (fitnessLevel: FitnessLevelType) => {
    setData((prevState) => ({...prevState, fitnessLevel}));
    setError((prevState) => ({...prevState, fitnessLevel: ''}));
    setIsLevelOpen((prevState) => !prevState);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('description', data.trainingDescription);
    formData.append('trainingTime', data.trainingTime);
    formData.append('level', data.fitnessLevel);
    formData.append('gender', data.gender);
    formData.append('calories', data.caloriesWaste);
    formData.append('price', data.price);

    if (data.video) {
      formData.append('video', data.video);
    }
    const newError = validateFields(data);

    if (!newError) {
      dispatch(createTrainingAction(formData));
      setData((prevState) => ({
        ...prevState,
        title: '',
        type: '',
        trainingDescription: '',
        trainingTime: '',
        fitnessLevel: '',
        gender: '',
        caloriesWaste: '',
        price: '',
        video: null
      }));
    } else {
      setError(newError);
    }
  };

  return (
    <Layout>
      <div className="popup-form popup-form--create-training">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Создание тренировки</h1>
            </div>
            <div className="popup-form__form">
              <form onSubmit={handleFormSubmit} ref={formRef}>
                <div className="create-training">
                  <div className="create-training__wrapper">
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Название тренировки</h2>
                      <CustomInput
                        type='text'
                        name='title'
                        value={data.title}
                        errorMessage={error.title}
                        className='create-training__input'
                        onInputChange={handleFieldChange}
                      />
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Характеристики тренировки</h2>
                      <div className="create-training__info">
                        <CustomSelect
                          title='Выберите тип тренировки'
                          selectedValue={data.type}
                          isOpen={isTypeOpen}
                          errorMessage={error.type}
                          option={Exercise}
                          nameTransform={EXERCISE_NAMES}
                          onListBoxClick={handleTypeSelectClick}
                          onListOptionClick={handleTypeClick}
                        />
                        <CustomInput
                          label='Сколько калорий потратим'
                          type='number'
                          name='caloriesWaste'
                          value={data.caloriesWaste}
                          errorMessage={error.caloriesWaste}
                          fieldText='ккал'
                          textPosition='right'
                          onInputChange={handleFieldChange}
                        />
                        <CustomSelect
                          title='Сколько времени потратим'
                          selectedValue={data.trainingTime}
                          isOpen={isTrainingTimeOpen}
                          errorMessage={error.trainingTime}
                          option={TrainingTime}
                          nameTransform={TRAINING_TIME_NAMES}
                          onListBoxClick={handleTrainingTimeSelectClick}
                          onListOptionClick={handleTrainingTimeClick}
                        />
                        <CustomInput
                          label='Стоимость тренировки'
                          type='number'
                          name='price'
                          value={data.price}
                          errorMessage={error.price}
                          fieldText='₽'
                          textPosition='right'
                          onInputChange={handleFieldChange}
                        />
                        <CustomSelect
                          title='Выберите уровень тренировки'
                          selectedValue={data.fitnessLevel}
                          isOpen={isLevelOpen}
                          errorMessage={error.fitnessLevel}
                          option={FitnessLevel}
                          nameTransform={FITNESS_LEVEL_NAME}
                          onListBoxClick={handleLevelSelectClick}
                          onListOptionClick={handleLevelClick}
                        />
                        <div className="create-training__radio-wrapper">
                          <span className="create-training__label">Кому подойдет тренировка</span>
                          <br />
                          <div className="custom-toggle-radio create-training__radio">
                            {Object.values(Gender).map((gender) => (
                              <div className="custom-toggle-radio__block" key={gender}>
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={data.gender === gender}
                                    onChange={handleFieldChange}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">{GENDER_NAME[gender]}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Описание тренировки</h2>
                      <CustomTextarea
                        name='trainingDescription'
                        value={data.trainingDescription}
                        className='create-training__textarea'
                        errorMessage={error.trainingDescription}
                        onTextareaChange={handleFieldChange}
                      />
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                      <div className="drag-and-drop create-training__drag-and-drop">
                        <label>
                          <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import-video"></use>
                            </svg>
                          </span>
                          <input
                            type="file"
                            name="video"
                            tabIndex={-1} accept=".mov, .avi, .mp4"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn create-training__button" type="submit">Опубликовать</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
