import { Card } from 'antd';
import { ReactNode } from 'react';

interface IFormCardProps {
  title: string;
  children: ReactNode;
}

const style = {
  width: '100%',
};

const FormCard = ({ title, children }: IFormCardProps) => {
  return (
    <Card hoverable title={title} style={style}>
      {children}
    </Card>
  );
};

export default FormCard;
