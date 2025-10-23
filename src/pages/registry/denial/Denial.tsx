import DenialForm from './DenialForm';
import { IRegistry } from '@/features/registries/types';

interface IDenialProps {
  registry: IRegistry;
}

export default function Denial({ registry }: IDenialProps) {
  return <DenialForm denial={registry} />;
}
