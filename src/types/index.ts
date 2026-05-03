export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  category: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  points: string[];
  result: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UserTarget {
  id: string;
  title: string;
  description: string;
}
