import ContractForm from './ContractForm';
import { IRegistry } from '@/features/registries/types';

interface IRegistryChoicesProps {
  registry: IRegistry;
}

export default function Contract({ registry }: IRegistryChoicesProps) {
  return <ContractForm contract={registry} />;
}
