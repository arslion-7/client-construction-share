import { IArea } from '@/features/areas/types';
import dayjs from 'dayjs';
import { IAreaStreetForm } from '@/components/form/AreaStreetForm';
import { IAreaAddressForm } from '@/components/form/AreaAddressForm';

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

export function getAreaStreetInitials(
  isNew: boolean,
  instance: { areas?: IArea[]; street: string }
) {
  return isNew
    ? ({} as IAreaStreetForm)
    : {
        street: instance.street,
        areas: getAreasIDs(instance)
      };
}

export function getAreaAddressInitials(
  isNew: boolean,
  instance: {
    areas?: IArea[];
    address: string;
    address_additional_info: string;
  }
) {
  return isNew
    ? ({} as IAreaAddressForm)
    : {
        areas: getAreasIDs(instance),
        address: instance.address,
        address_additional_info: instance.address_additional_info
      };
}
