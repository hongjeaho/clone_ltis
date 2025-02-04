import React, { useState } from 'react';
import styles from './AllMenu.module.css';

const AllMenu: React.FC= () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  // // 모달 열기/닫기 함수
  const openModal = () => {setIsModalOpen(true);}
  // const closeModal = () => {setIsModalOpen(false);}

  return (
    <div className={styles.center}>
      <button onClick={openModal} className={styles.hmb}><i></i>모달 열기 {isModalOpen}</button>
    </div>
  );
}

export default AllMenu