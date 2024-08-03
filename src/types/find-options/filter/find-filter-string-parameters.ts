export interface FindFilterStringParameters {
  readonly include?: readonly FindFilterStringParametersByType[];
  readonly exclude?: readonly FindFilterStringParametersByType[];
}

export interface FindFilterStringParametersByType {
  readonly startsWith?: string;
  readonly endsWith?: string;
  readonly contains?: string;
  readonly equals?: string;
}
