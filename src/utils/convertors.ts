import { IArea } from '@/features/areas/types';
import dayjs from 'dayjs';
import { IAddressForm } from '@/components/form/AreaForm';

interface ItemProps {
  label: string;
  value: string;
}

export const convertToItemProps = (list: string[]): ItemProps[] =>
  list.map((opt) => ({ label: opt, value: opt }));

export const getDateOrNull = (
  date: string | dayjs.Dayjs | null | undefined
) => {
  return date ? dayjs(date) : null;
};

export function getAreasIDs(instance: { areas?: IArea[] }) {
  return instance.areas ? instance.areas.map((area) => area.code) : [];
}

export function getAddressInitials(
  isNew: boolean,
  instance: { areas?: IArea[]; street: string }
) {
  return isNew
    ? ({} as IAddressForm)
    : {
        street: instance.street,
        areas: getAreasIDs(instance)
      };
}
