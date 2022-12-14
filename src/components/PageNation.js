import { useEffect, useState, useCallback } from "react";
import "./PageNation.css";

function PageNation({ total = 100 }) {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [pageList, setPageList] = useState([]);

  const PageListDefault = useCallback(
    (arr = []) => {
      if (total > 12) {
        for (let i = 1; i < 11; i++) {
          arr.push(i);
        }
      } else {
        for (let i = 1; i < total + 1; i++) {
          arr.push(i);
        }
      }
      return arr;
    },
    [total]
  );

  const pageNextPrevent = (arr = []) => {
    for (let i = 0; i < total; i++) {
      arr.push(total - i);
      if (String(total - i)[String(total - i).length - 1] === "1") {
        break;
      }
    }
    setCurrentNumber(arr[0]);
    setPageList(arr.reverse());
  };

  const pagePreviousPrevent = () => {
    setPageList(PageListDefault());
    setCurrentNumber(PageListDefault()[0]);
  };

  const nextPageList = (arr = []) => {
    if (currentNumber === total) return pageList;

    if (currentNumber + 10 < total) {
      for (let i = currentNumber + 1; i < currentNumber + 11; i++) {
        arr.push(i);
      }

      setCurrentNumber(arr[0]);
      return arr;
    } else {
      for (let i = currentNumber + 1; i <= total; i++) {
        arr.push(i);
      }

      setCurrentNumber(arr[0]);
      return arr;
    }
  };

  const previousPageList = (arr = []) => {
    if (currentNumber === 1) return PageListDefault();

    for (let i = currentNumber - 1; i > currentNumber - 11; i--) {
      arr.push(i);
    }

    setCurrentNumber(arr[0]);
    return arr.reverse();
  };

  const nextPageMove = () => {
    return pageList.find((el) => currentNumber + 1 === el)
      ? setCurrentNumber(currentNumber + 1)
      : setPageList(nextPageList());
  };

  const previousPageMove = () => {
    return pageList.find((el) => currentNumber - 1 === el)
      ? setCurrentNumber(currentNumber - 1)
      : setPageList(previousPageList());
  };

  useEffect(() => {
    setPageList(PageListDefault());
  }, [PageListDefault]);

  console.log(currentNumber);

  return (
    <section className="PageNation_Container">
      <button className="PageNation_Button-previous" onClick={previousPageMove}>
        {"<"}
      </button>
      {pageList[0] !== 1 ? (
        <span
          className="PageNation_Container-lastNum"
          onClick={() => pagePreviousPrevent()}
        >
          1
        </span>
      ) : null}

      {pageList[0] !== 1 ? <span>...</span> : null}
      <ul className="PageNation_PageList">
        {pageList.map((el) => (
          <li
            onClick={() => {
              return el === currentNumber ? null : setCurrentNumber(el);
            }}
            key={el}
            style={{
              color: el === currentNumber ? "#000" : "#b7b7b7",
              backgroundColor: el === currentNumber ? "#f1f1f1" : null,
            }}
          >
            {el}
          </li>
        ))}
      </ul>
      <span>{pageList[pageList.length - 1] !== total ? "..." : null}</span>
      <span
        className="PageNation_Container-lastNum"
        onClick={() => pageNextPrevent()}
      >
        {pageList[pageList.length - 1] !== total ? total : null}
      </span>
      <button className="PageNation_Button-next" onClick={nextPageMove}>
        {">"}
      </button>
    </section>
  );
}

export default PageNation;
