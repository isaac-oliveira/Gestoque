export interface Dialog {
  show: (dialog: () => React.ReactElement) => void;
  hide: () => void;
}
