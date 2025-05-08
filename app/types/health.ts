export interface IHealthService {
  initialize(): Promise<void>;
  requestPermissions(): Promise<boolean>;
  fetchHeight(): Promise<number | null>;
  saveHeight(height: number): Promise<void>;
  fetchSteps(): Promise<number | null>;
}

export interface HealthData {
  height: number | null;
  steps: number | null;
}

export interface HealthDataCardProps {
  title: string;
  value: number | null;
  unit: string;
  onPress?: () => void;
}

export interface InputFormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
}
