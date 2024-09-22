import type { ComponentType } from 'react';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { SvgIcon } from './features/icons/components/SvgIcon';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { CommonLayout } from './foundation/layouts/CommonLayout';
import { Color, Space, Typography } from './foundation/styles/variables';

const lazyImport = <T extends { [P in U]: ComponentType<any> }, U extends string>(
  factory: () => Promise<T>,
  name: U,
) => ({
  [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
});

// import { AuthorDetailPage } from './pages/AuthorDetailPage';
const { AuthorDetailPage } = lazyImport(() => import('./pages/AuthorDetailPage'), 'AuthorDetailPage');
// import { BookDetailPage } from './pages/BookDetailPage';
const { BookDetailPage } = lazyImport(() => import('./pages/BookDetailPage'), 'BookDetailPage');
// import { EpisodeDetailPage } from './pages/EpisodeDetailPage';
const { EpisodeDetailPage } = lazyImport(() => import('./pages/EpisodeDetailPage'), 'EpisodeDetailPage');
// import { SearchPage } from './pages/SearchPage';
const { SearchPage } = lazyImport(() => import('./pages/SearchPage'), 'SearchPage');
// import { TopPage } from './pages/TopPage';
const { TopPage } = lazyImport(() => import('./pages/TopPage'), 'TopPage');

const _BackToTopButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Space * 1}px;
  border: none;
  background-color: transparent;
`;

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />} path={'/'}>
        <Route element={<Suspense fallback={<div>Loading...</div>}><TopPage /></Suspense>} path={''} />
      </Route>
      <Route
        element={
          <ActionLayout
            leftContent={
              <_BackToTopButton href={'/'}>
                <SvgIcon color={Color.MONO_100} height={32} type="ArrowBack" width={32} />
                <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                  トップへ戻る
                </Text>
              </_BackToTopButton>
            }
          />
        }
        path={'/'}
      >
        <Route element={<Suspense fallback={<div>Loading...</div>}><BookDetailPage /></Suspense>} path={'books/:bookId'} />
        <Route element={<Suspense fallback={<div>Loading...</div>}><EpisodeDetailPage /></Suspense>} path={'books/:bookId/episodes/:episodeId'} />
        <Route element={<Suspense fallback={<div>Loading...</div>}><AuthorDetailPage /></Suspense>} path={'authors/:authorId'} />
        <Route element={<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>} path={'search'} />
      </Route>
    </Routes>
  );
};
