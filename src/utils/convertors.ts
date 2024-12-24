import dayjs from 'dayjs';

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
