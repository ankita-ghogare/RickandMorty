import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Character from "../Character/Character";
import "./Characters.css";

const fetchCharacters = async ({ queryKey }) => {
  const page = queryKey[1];
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return response.data;
};

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: charactersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["characters", currentPage],
    queryFn: fetchCharacters,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <p>Loading characters...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const totalPages = charactersData
    ? Math.ceil(charactersData.info.count / 20)
    : 0;

  const paginationButtons = () => {
    let buttons = [];
    let startPage;
    let endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // Previous Page
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );

    // First Page
    if (startPage > 1) {
      buttons.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      );
      buttons.push(
        <span key="ellipsis1" className="ellipsis">
          ...
        </span>
      );
    }

    // Page Numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      );
    }

    // Last Page
    if (endPage < totalPages) {
      buttons.push(
        <span key="ellipsis2" className="ellipsis">
          ...
        </span>
      );
      buttons.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    // Next Page
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="wrapper_Chars">
      <div className="container_characters">
        <div className="container_div">
          {charactersData &&
            charactersData.results.map((character) => (
              <Character key={character.id} character={character} />
            ))}
        </div>
        <div className="pagination_controls">{paginationButtons()}</div>
      </div>
    </div>
  );
};

export default Characters;
