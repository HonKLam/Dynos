export enum MemoVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PROTECTED = 'PROTECTED',
}

export enum MemoState {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  NORMAL = 'NORMAL',
  ARCHIVED = 'ARCHIVED',
}

enum MemoRelationType {
  TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
  REFERENCE = 'REFERENCE',
  COMMENT = 'COMMENT',
}

type MemoAttachment = {
  name: string
  createTime: Date
  filename: string
  content: Uint8Array
  externalLink: string
  type: string
  size: string
  memo: string
}

type MemoRelation = {
  memo: {
    name: string
    snippet: string
  }
  relatedMemo: {
    name: string
    snippet: string
  }
  type: MemoRelationType
}

type MemoReaction = {
  name: string
  creator: string
  contentId: string
  reactionType: string
  createTime: Date
}

type MemoProperty = {
  hasLink: boolean
  hasTaskList: boolean
  hasIncompleteTasks: boolean
}

type MemoLocation = {
  placeholder: string
  latitude: number
  longitude: number
}

interface BaseMemoLocalMeta {
  id: string
  localDisplayTime: Date
  isDirty: boolean
}

export interface BaseMemo extends BaseMemoLocalMeta {
  content: string
  state: MemoState
  visibility: MemoVisibility
}

export interface Memo extends BaseMemo {
  name: string
  creator: string
  createTime: string
  updateTime: string
  displayTime: string
  nodes: object[]
  pinned: boolean
  attachments: MemoAttachment[]
  relations: MemoRelation[]
  reations: MemoReaction[]
  property: MemoProperty
  parent: string
  snippet: string
  location: MemoLocation
}

export type Memos = {
  memos: Memo[]
  nextPageToken: string
  totalSize: number
}

// Local-only metadata keyed by memo.name
export type MemosLocalMeta = Record<string, BaseMemoLocalMeta>
