/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import Loader from '../../assets/json/loader.json';
import { Books } from '../../components/books';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { RejectModal } from '../../components/reject-modal';
import { Sidebar } from '../../components/sidebar';
import { booksSelector, fetchBooks } from '../../redux/slices/books-slice';
import { fetchCategories } from '../../redux/slices/category-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpenModal, setModal] = useState(true);
  const { status } = useAppSelector((state) => booksSelector(state));

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchBooks());

    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className={styles.main_page}>
      <Header />
      <main className={status === 'error' && isOpenModal ? styles.main_content_rejected : styles.main_content}>
        <div className={styles.main_content_sidebarNcontent}>
          <Sidebar />
          <div
            className={`${styles.main_content_wrapper} ${
              status === 'loaded' ? styles.loaded_data : styles.unloaded_data
            }`}
          >
            <Navigation />
            <Books />
          </div>
        </div>
        <div className={status === 'loading' ? styles.loading_data : styles.unloaded_data} data-test-id='loader'>
          <div className={styles.loading_data_blur} />
          <Lottie animationData={Loader} />
        </div>
        <div
          className={status === 'error' && isOpenModal ? styles.rejected_data : styles.unloaded_data}
          data-test-id='error'
        >
          <RejectModal closeModal={closeModal} />
        </div>
      </main>
      <Footer />
    </section>
  );
};
