import PaginationButton from "./pagination-button";

interface ITripPaginationProps {
  increment: () => void;
  decrement: () => void;
  setPage: (page: number) => void;
  dataLength: number;
  currentPageIndex: number;
}

const TripPagination = (props: ITripPaginationProps) => {
  const pagesArray = Array.from({ length: props.dataLength }, (_, i) => i + 1);

  return (
    <div className="flex space-x-6">
      <PaginationButton value={"<<"} onClick={props.decrement} />
      {pagesArray.map((page, index) => (
        <PaginationButton
          isCurrent={props.currentPageIndex === index}
          value={page}
          onClick={() => props.setPage(index)}
          key={page}
        />
      ))}
      <PaginationButton value={">>"} onClick={props.increment} />
    </div>
  );
};

export default TripPagination;
