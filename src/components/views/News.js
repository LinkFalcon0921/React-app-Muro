import React, { useState, useEffect } from 'react';
import {
  getPublicNews,
  getTotalPages,
} from '../../utilities/messages/PublishActions';
import NewInfo from '../layouts/NewInfo';
import NavPagination from '../layouts/NavPagination';

export default function News() {
  const [news, setNews] = useState();
  const [pageActual, setPage] = useState(1);

  const maxPage = async () => {
    return await getTotalPages();
  };

  const pageChange = (pageTo) => {
    setPage(pageTo);
  };

  const publications = async () => {
    // debugger;
    const data = await getPublicNews(pageActual - 1);
    // debugger;
    setNews(data);
  };

  useEffect(() => {
    publications();
  }, [pageActual]);

  return (
    <div className="container d-flex flex-column">
      <h1 className="text-center fst-italic">Publicaciones</h1>

      {news &&
        news.map((doc, index) => {
          return <NewInfo key={index} info={doc} />;
        })}

      <NavPagination
        actualPage={pageActual}
        pages={maxPage}
        toPage={pageChange}
      />
    </div>
  );
}
