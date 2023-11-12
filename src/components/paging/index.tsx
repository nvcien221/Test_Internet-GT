import css from "./paging.module.scss";
export default function Paging(props: {
  totalItem: number;
  selectedPage: number;
  setSelectedPage: (a: number) => void;
}) {
  const { selectedPage, totalItem, setSelectedPage } = props;
  const next = (add: number) => {
    let count = selectedPage + add;
    if (count < 1) count = 1;
    if (count > totalItem) count = totalItem;
    setSelectedPage(count);
  };
  const select = (item: number) => {
    setSelectedPage(item);
  };
  const render = () => {
    const htmlString = [];
    // render button '<'
    if (selectedPage === 1) {
      htmlString.push(
        <div
          key={-1}
          className={css["page-button"] + " " + css["disable"]}
          onClick={() => {
            next(-1);
          }}
        >
          &lt;
        </div>,
      );
    } else {
      htmlString.push(
        <div
          key={-1}
          className={css["page-button"]}
          onClick={() => {
            next(-1);
          }}
        >
          &lt;
        </div>,
      );
    }
    //--------------------------
    // render các button ở giữa '<' và '>'
    if (totalItem <= 5) {
      for (let i = 1; i <= totalItem; i++) {
        if (selectedPage === i) {
          htmlString.push(
            <div
              key={i}
              className={css["page-button"] + " " + css["active"]}
              onClick={() => select(i)}
            >
              {i}
            </div>,
          );
        } else {
          htmlString.push(
            <div
              key={i}
              className={css["page-button"]}
              onClick={() => select(i)}
            >
              {i}
            </div>,
          );
        }
      }
    } else {
      // totalItem > 6
      if (selectedPage - 1 <= 2) {
        for (let i = 1; i < selectedPage; i++) {
          htmlString.push(
            <div
              key={i}
              className={css["page-button"]}
              onClick={() => select(i)}
            >
              {i}
            </div>,
          );
        }
      } else {
        htmlString.push(
          <div key={1} className={css["page-button"]} onClick={() => select(1)}>
            {1}
          </div>,
        );
        htmlString.push(
          <div key={"...1"} className={css["page-button"] + " " + css["dot"]}>
            ...
          </div>,
        );
        htmlString.push(
          <div
            key={selectedPage - 1}
            className={css["page-button"]}
            onClick={() => select(selectedPage - 1)}
          >
            {selectedPage - 1}
          </div>,
        );
      }
      htmlString.push(
        <div
          key={selectedPage}
          className={css["page-button"] + " " + css["active"]}
          onClick={() => select(selectedPage)}
        >
          {selectedPage}
        </div>,
      );
      if (totalItem - selectedPage > 2) {
        htmlString.push(
          <div
            key={selectedPage + 1}
            className={css["page-button"]}
            onClick={() => select(selectedPage + 1)}
          >
            {selectedPage + 1}
          </div>,
        );
        htmlString.push(
          <div key={"...2"} className={css["page-button"] + " " + css["dot"]}>
            ...
          </div>,
        );
        htmlString.push(
          <div
            key={totalItem}
            className={css["page-button"]}
            onClick={() => select(totalItem)}
          >
            {totalItem}
          </div>,
        );
      } else {
        for (let i = selectedPage + 1; i <= totalItem; i++) {
          htmlString.push(
            <div
              key={i}
              className={css["page-button"]}
              onClick={() => select(i)}
            >
              {i}
            </div>,
          );
        }
      }
    }
    //--------------------------
    // render button '>' 
    if (selectedPage === totalItem) {
      htmlString.push(
        <div
          key={totalItem + 1}
          className={css["page-button"] + " " + css["disable"]}
          onClick={() => {
            next(1);
          }}
        >
          &gt;
        </div>,
      );
    } else {
      htmlString.push(
        <div
          key={totalItem + 1}
          className={css["page-button"]}
          onClick={() => {
            next(1);
          }}
        >
          &gt;
        </div>,
      );
    }
    return htmlString;
  };
  return (
    <>
      <div className={css["page"]}>{render()}</div>
    </>
  );
}
