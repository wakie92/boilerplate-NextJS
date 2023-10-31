import styled from 'styled-components';
import Sheet from 'react-modal-sheet';

import { BOTTOM_SHEET_MIN_HEIGHT } from 'src/utils/constants';

export const BuildingDetailSheet = styled(Sheet)`
  width: 1440px;
  margin: auto;
`;

export const SheetScroller = styled.div`
  width: 1200px;
  margin: auto;
  height: ${BOTTOM_SHEET_MIN_HEIGHT}px;
  display: flex;
  flex-direction: column;
`;
