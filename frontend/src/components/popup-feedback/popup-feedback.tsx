export const PopupFeedback = () => (
  <div className="wrapper">
    <main>
      <div className="popup-form popup-form--feedback">
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Оставить отзыв</h2>
              <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--feedback">
              <h3 className="popup__feedback-title">Оцените тренировку</h3>
              <ul className="popup__rate-list">
                <li className="popup__rate-item">
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input type="radio" name="оценка тренировки" aria-label="оценка 1." value="1" />
                      <span className="popup__rate-number">1</span>
                    </label>
                  </div>
                </li>
                <li className="popup__rate-item">
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input type="radio" name="оценка тренировки" aria-label="оценка 2." value="2" />
                      <span className="popup__rate-number">2</span>
                    </label>
                  </div>
                </li>
                <li className="popup__rate-item">
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input type="radio" name="оценка тренировки" aria-label="оценка 3." value="3" />
                      <span className="popup__rate-number">3</span>
                    </label>
                  </div>
                </li>
                <li className="popup__rate-item">
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input type="radio" name="оценка тренировки" aria-label="оценка 4." value="4" />
                      <span className="popup__rate-number">4</span>
                    </label>
                  </div>
                </li>
                <li className="popup__rate-item">
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input type="radio" name="оценка тренировки" aria-label="оценка 5." value="5" checked />
                      <span className="popup__rate-number">5</span>
                    </label>
                  </div>
                </li>
              </ul>
              <div className="popup__feedback">
                <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
                <div className="popup__feedback-textarea">
                  <div className="custom-textarea">
                    <label>
                      <textarea name="description" placeholder=" "></textarea>
                    </label>
                  </div>
                </div>
              </div>
              <div className="popup__button">
                <button className="btn" type="button">Продолжить</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
);
