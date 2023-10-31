import React, { FC, useRef, useState } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';

import { BOTTOM_SHEET_MAX_HEIGHT, BOTTOM_SHEET_MIN_HEIGHT } from 'src/utils/constants';

import { BuildingDetailSheet, SheetScroller } from './styled';

const BottomSheetComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<SheetRef>(null);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const handle = () => {
    const bottomSheetDOM = document.getElementsByClassName('react-modal-sheet-scroller')[0];

    if (bottomSheetDOM.clientHeight > BOTTOM_SHEET_MIN_HEIGHT) {
      ref.current?.snapTo(1);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>

      <BuildingDetailSheet
        ref={ref}
        isOpen={isOpen}
        onClose={handle}
        snapPoints={[BOTTOM_SHEET_MAX_HEIGHT, BOTTOM_SHEET_MIN_HEIGHT, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          {/**
           * Since `Sheet.Content` is a `motion.div` it can receive motion values
           * in it's style prop which allows us to utilise the exposed `y` value.
           *
           * By syncing the padding bottom with the `y` motion value we introduce
           * an offset that ensures that the sheet content can be scrolled all the
           * way to the bottom in every snap point.
           */}
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Sheet.Scroller draggableAt="both">
              {/* Some content here that makes the sheet content scrollable */}
              <SheetScroller ref={scrollDivRef} className="sheet-scroller-content">
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
                <button>asdasdasd</button>
              </SheetScroller>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </BuildingDetailSheet>
    </>
  );
};

export default BottomSheetComponent;
