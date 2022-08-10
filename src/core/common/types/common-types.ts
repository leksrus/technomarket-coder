
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type CodeDescription = {
  code: number;
  message: string;
};

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  data?: TData;
};

export type ClassValidationDetails = {
  context: Optional<CodeDescription>;
  errors: Array<ClassValidationErrors>;
};

export type ClassValidationErrors = {
  object: string;
  property: string;
  value: string;
  message: Array<string>;
};

export type ExceptionError = {
  title: string;
  status: number;
  instance?: Nullable<string>;
};

