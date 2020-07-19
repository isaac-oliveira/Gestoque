export interface ColorProps {
  color?: string;
}

export interface ButtonProps {
  icon?: React.ReactElement;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface InputProps {
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  type?: string;
}

export interface ItemSideBarProps {
  selected: boolean;
}

export interface DialogProps {
  dialog: (() => React.ReactElement) | null;
  hide: () => void;
}

interface AddProductProps {
  title: string;
  product?: ProductResponse;
}

interface QueueProps {
  title: string;
  hideQueue?: () => void;
}
