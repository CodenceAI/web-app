export interface RepoData {
  id: string;
  name: string;
  url: string;
  description?: string;
  language: string;
  stars?: number;
  forks?: number;
  files: FileNode[];
  totalFiles: number;
  lastUpdated: string;
}

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  children?: FileNode[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeResults?: CodeResult[];
  isLoading?: boolean;
}

export interface CodeResult {
  id: string;
  filePath: string;
  fileName: string;
  language: string;
  code: string;
  explanation: string;
  relevanceScore: number;
  startLine: number;
  endLine: number;
}