import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import Loader from '../../assets/json/loader.json';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { RejectModal } from '../../components/reject-modal';
import { Sidebar } from '../../components/sidebar';
import { categoriesSelector, fetchCategories } from '../../redux/slices/category-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './rules.module.scss';

export const Rules = () => {
  const navigate = useNavigate();
  const [isOpenModal, setModal] = useState(true);
  const dispatch = useAppDispatch();
  const { statusCategories } = useAppSelector((state) => categoriesSelector(state));

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    const queryCategories = async () => {
      dispatch(fetchCategories());
    };

    queryCategories();
  }, [dispatch]);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <section className={styles.rules}>
      <Header />
      <div className={statusCategories === 'loaded' ? styles.loaded_data : styles.unloaded_data}>
        <section className={styles.rules_wrapper}>
          <Sidebar />
          <div className={styles.rules_wrapper_content}>
            <h1>Правила пользования</h1>
            <div className={styles.rules_wrapper_content_text}>
              <h5>
                1. Идейные соображения высшего порядка, а также высокое качество позиционных исследований представляет
                собой интересный эксперимент проверки экспериментов, поражающих по своей масштабности и грандиозности.
              </h5>
              <div className={styles.rules_wrapper_content_text_paragraphs}>
                <p>
                  1.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет
                  каждого участника как способного принимать собственные решения касаемо инновационных методов
                  управления процессами.
                </p>
                <p>
                  1.2. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление
                  играет важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности
                  внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической
                  анафеме.
                </p>
                <p>
                  1.3. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся
                  непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
                </p>
                <p>
                  1.4. Но независимые государства, которые представляют собой яркий пример континентально-европейского
                  типа политической культуры, будут объединены в целые кластеры себе подобных.
                </p>
              </div>
            </div>
            <div className={styles.rules_wrapper_content_text}>
              <h5>
                2. С учётом сложившейся международной обстановки, консультация с широким активом предоставляет широкие
                возможности для приоритизации разума над эмоциями.
              </h5>
              <div className={styles.rules_wrapper_content_text_paragraphs}>
                <p>
                  2.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет
                  каждого участника как способного принимать собственные решения касаемо инновационных методов
                  управления процессами.
                </p>
                <div className={styles.rules_wrapper_content_text_paragraphs_subparagraphs}>
                  <p>
                    2.1.1. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление
                    играет важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности
                    внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической
                    анафеме.
                  </p>
                  <p>
                    2.1.2. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся
                    непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
                  </p>
                </div>
                <p>
                  2.2. Но независимые государства, которые представляют собой яркий пример континентально-европейского
                  типа политической культуры, будут объединены в целые кластеры себе подобных.
                </p>
              </div>
            </div>
            <div className={styles.rules_wrapper_content_text}>
              <h5>
                3. Принимая во внимание показатели успешности, укрепление и развитие внутренней структуры требует от нас
                анализа приоритизации разума над эмоциями.
              </h5>
              <div className={styles.rules_wrapper_content_text_paragraphs}>
                <p>
                  3.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет
                  каждого участника как способного принимать собственные решения касаемо инновационных методов
                  управления процессами.
                </p>
                <div className={styles.rules_wrapper_content_text_paragraphs_subparagraphs}>
                  <p>
                    3.1.1. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление
                    играет важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности
                    внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической
                    анафеме.
                  </p>
                  <p>
                    3.1.2. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся
                    непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
                  </p>
                </div>
                <p>
                  3.2. Но независимые государства, которые представляют собой яркий пример континентально-европейского
                  типа политической культуры, будут объединены в целые кластеры себе подобных.
                </p>
                <p>
                  3.3. Не следует, однако, забывать, что экономическая повестка сегодняшнего дня требует анализа анализа
                  существующих паттернов поведения.
                </p>
                <div className={styles.rules_wrapper_content_text_paragraphs_subparagraphs}>
                  <p>
                    3.3.1. А ещё представители современных социальных резервов набирают популярность среди определенных
                    слоев населения, а значит, должны быть функционально разнесены на независимые элементы.
                  </p>
                  <div className={styles.rules_wrapper_content_text_paragraphs_subparagraphs_sub}>
                    <p>
                      3.3.1.1. Стремящиеся вытеснить традиционное производство, нанотехнологии могут быть объявлены
                      нарушающими общечеловеческие нормы этики и морали.
                    </p>
                    <p>
                      3.3.1.2. Прежде всего, разбавленное изрядной долей эмпатии, рациональное мышление однозначно
                      фиксирует необходимость новых предложений. Являясь всего лишь частью общей картины, независимые
                      государства представлены в исключительно положительном свете.
                    </p>
                  </div>
                </div>
                <p>
                  3.4. Повседневная практика показывает, что убеждённость некоторых оппонентов требует от нас анализа
                  распределения внутренних резервов и ресурсов.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className={statusCategories === 'loading' ? styles.loading_data : styles.unloaded_data}
        data-test-id='loader'
      >
        <div className={styles.loading_data_blur} />
        <Lottie animationData={Loader} />
      </div>
      <div
        className={statusCategories === 'error' && isOpenModal ? styles.rejected_data : styles.unloaded_data}
        data-test-id='error'
      >
        <RejectModal closeModal={closeModal} />
      </div>
      <Footer />
    </section>
  );
};
