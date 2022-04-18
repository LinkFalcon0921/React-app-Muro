import React, { useEffect, useState } from 'react';

export default function NavPagination(props) {
  const { actualPage, pages, toPage } = props;

  const [page, setPage] = useState([]);

  const redirect = async (index) => {
    const pagesTotal = await pages();
    // console.log(pagesTotal);
    // debugger;
    const to = actualPage + index;

    if (to > 0 && to <= pagesTotal) {
      toPage(actualPage + index);
    }
  };

  const goToPage = (index) => {
    // debugger;
    toPage(index);
  };

  const pageIndex = async () => {
    const list = [];
    // debugger;
    const pagesTotal = await pages();

    let startShow = 1;
    let endShow = 1;

    if (actualPage == 1) {
      startShow = 0;
    }
    if (actualPage == pagesTotal) {
      endShow = 0;
    }
    for (
      let indx = actualPage - startShow;
      indx <= actualPage + endShow;
      indx++
    ) {
      const classStyle = indx == actualPage ? 'page-link' : 'page-link active';

      list.push({ index: indx, classes: classStyle });
    }
    setPage(list);
  };

  useEffect(() => {
    pageIndex();
  }, [actualPage]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => redirect(-1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {page.map((pag, index) => {
          return (
            <li key={index} className="page-item">
              <a className={pag.classes} onClick={() => goToPage(pag.index)}>
                {pag.index}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => redirect(1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
