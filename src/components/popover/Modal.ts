import { TooltipPlacement } from 'antd/lib/tooltip';
import { ItemListOptionFilterStatusFlight, some } from '~/utils/constants/constant';

export interface PopoverRadioProps {
  trigger?: string;
  placement?: TooltipPlacement;
  title?: string;
  handleRemoveField: Function;
  defaultVisible: boolean;
  name: string;
  options?: ItemListOptionFilterStatusFlight[];
  handleFetData: Function;
}
