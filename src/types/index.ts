export interface DataItem {
  id: number;
  name: string;
  value: number;
  date: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

export interface TableColumn {
  field: string;
  headerName: string;
  width: number;
} 