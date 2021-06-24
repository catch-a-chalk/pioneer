import BN from 'bn.js'

import { capitalizeFirstLetter } from '@/common/helpers'
import {
  ApplicationWithdrawnEventFieldsFragment,
  AppliedOnOpeningEventFieldsFragment,
  BudgetSpendingActivityEventFieldsFragment,
} from '@/working-groups/queries/__generated__/workingGroups.generated'
import {
  ApplicationWithdrawnActivity,
  AppliedOnOpeningActivity,
  asWorkingGroupName,
  BudgetSpendingActivity,
} from '@/working-groups/types'

function asPositionTitle(groupName: string, type: 'LEADER' | 'REGULAR') {
  return `${capitalizeFirstLetter(asWorkingGroupName(groupName))} ${type == 'LEADER' ? 'Leader' : 'Worker'}`
}

export function asAppliedOnOpeningActivity(fragment: AppliedOnOpeningEventFieldsFragment): AppliedOnOpeningActivity {
  return {
    eventType: 'AppliedOnOpening',
    id: fragment.id,
    createdAt: fragment.createdAt,
    member: {
      id: fragment.application.applicant.id,
      handle: fragment.application.applicant.handle,
    },
    opening: {
      id: fragment.opening.id,
      type: fragment.opening.type,
      groupName: fragment.group.name,
      title: asPositionTitle(fragment.group.name, fragment.opening.type),
    },
  }
}

export function asApplicationWithdrawnActivity(
  fragment: ApplicationWithdrawnEventFieldsFragment
): ApplicationWithdrawnActivity {
  return {
    eventType: 'ApplicationWithdrawn',
    id: fragment.id,
    createdAt: fragment.createdAt,
    member: {
      id: fragment.application.applicant.id,
      handle: fragment.application.applicant.handle,
    },
    opening: {
      id: fragment.application.opening.id,
      type: fragment.application.opening.type,
      groupName: fragment.group.name,
      title: asPositionTitle(fragment.group.name, fragment.application.opening.type),
    },
  }
}

export function asBudgetSpendingActivity(fragment: BudgetSpendingActivityEventFieldsFragment): BudgetSpendingActivity {
  return {
    eventType: 'BudgetSpending',
    id: fragment.id,
    createdAt: fragment.createdAt,
    groupName: fragment.group.name,
    amount: new BN(fragment.amount),
  }
}