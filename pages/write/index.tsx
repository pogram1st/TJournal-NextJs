import { NextPage } from 'next';
import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm';

const WritePage: NextPage = () => {
  return (
    <MainLayout hideComments hideMenu className='main-layout-white'>
      <WriteForm />
    </MainLayout>
  );
};

export default WritePage;
