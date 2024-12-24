import { Card } from 'antd';

const style: React.CSSProperties = {
  padding: '4px 0',
  margin: '4px 0 0 4px',
};

interface IFormCardProps {
  title: string;
  children: JSX.Element;
}

const FormCard = ({ title, children }: IFormCardProps) => {
  return (
    <Card
      hoverable
      title={title}
      style={style}
      styles={{ header: { backgroundColor: '#d9d9d9' } }}
    >
      {children}
    </Card>
  );
};

export default FormCard;
