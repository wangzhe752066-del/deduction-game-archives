import type { CaseData } from '../../types'
import { case01 } from './case01'
import { caseDoorbell } from './caseDoorbell'
import { casePrinter } from './casePrinter'
import { caseIntercom } from './caseIntercom'
import { caseGallery } from './caseGallery'

/** 《夜班档案》案件合集:新增案件时在此追加即可 */
export const allCases: CaseData[] = [case01, caseDoorbell, casePrinter, caseIntercom, caseGallery]

/** 按 id 查找案件 */
export const caseById = (id: string): CaseData | undefined =>
  allCases.find((c) => c.id === id)
