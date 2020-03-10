export interface BitbucketPrDiffEntity {
  status: 'modified' | 'merge conflict';
  old: DiffChange | null;
  new: DiffChange | null;
  lines_removed: number;
  lines_added: number;
}

interface DiffChange {
  path: string;
  type: 'commit_file';
}
