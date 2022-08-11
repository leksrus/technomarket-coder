
export interface HashHelperPort {
  hash(data: string): Promise<string>;

  compare(data: string, hash: string): Promise<boolean>;
}