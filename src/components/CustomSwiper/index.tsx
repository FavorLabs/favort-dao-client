import * as React from 'react';
import styles from './index.less';
import { createRef, ReactNode, useMemo, useRef, useState } from 'react';

export type Props = {
  items: LaminatedCard[];
  spacing: number;
};
type LaminatedCard = {
  key: number;
  content: ReactNode;
};
const CustomSwiper: React.FC<Props> = (props) => {
  const { items, spacing } = props;
  const [list, setList] = useState<LaminatedCard[]>(items);
  const [currentCard, setCurrentCard] = useState<LaminatedCard>({
    key: items[0]?.key || 0,
    content: items[0]?.content || <></>,
  });
  const touchData = useRef({
    touchStartX: 0,
    touchEndX: 0,
  });
  // const childRefs = useMemo(() => {
  //   return items.map((item, index) => {
  //     return createRef();
  //   })
  // }, [items])
  // const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

  const getSpacing = (idx: number) => {
    return idx < 3 ? idx * spacing + 'px' : 2 * spacing + 'px';
  };

  return (
    <div className={styles.customSwiper}>
      {!!list.length && (
        <>
          <div className={styles.laminatedCardWrap}>
            {list.map((item, index) => (
              <div
                key={index}
                // @ts-ignore
                // ref={childRefs[index]}
                className={styles.item}
                style={{
                  width: `calc(100% - ${spacing * 2}px)`,
                  // background: colors[index],
                  zIndex: items.length - index,
                  transform: `translate(calc(${
                    -100 * index + '%'
                  } + ${getSpacing(index)}), ${getSpacing(index)})`,
                }}
                onTouchStart={(e) => {
                  touchData.current.touchStartX = e.touches[0].clientX;
                }}
                onTouchMove={(e) => {
                  touchData.current.touchEndX = e.touches[0].clientX;
                }}
                onTouchEnd={() => {
                  const startX = touchData.current.touchStartX;
                  const endX = touchData.current.touchEndX;
                  let res = endX - startX;
                  if (startX === 0 || endX === 0 || res === 0) return;
                  const arr = [...list];
                  if (res < 0) {
                    console.log('to left', startX, endX);
                    // childRefs.forEach((item, index) => {
                    //   console.log('--', item.current);
                    //   if (item.current) {
                    //     //
                    //   }
                    // })
                    const i = arr.shift();
                    arr.push(i as LaminatedCard);
                  } else {
                    console.log('to right', startX, endX);
                    const i = arr.pop();
                    arr.unshift(i as LaminatedCard);
                  }
                  setList(arr);
                  setCurrentCard(arr[0]);
                  touchData.current.touchStartX = 0;
                  touchData.current.touchEndX = 0;
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
          <div
            className={styles.count}
            style={{
              width: 'calc(100% - 20px)',
              marginTop: `${spacing * 3}px`,
            }}
          >
            {currentCard.key + '/' + items.length}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSwiper;
