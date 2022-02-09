import React, { useMemo, useState } from 'react'

import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { CommonTiles } from '@/bounty/components/BountyTiles/CommonTiles'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { CommonTabs, CommonTabsState } from '@/bounty/components/tabsSets/CommonTabs'
import { getFundingPeriodLength } from '@/bounty/helpers'
import { useBountyEntrants } from '@/bounty/hooks/useBountyEntrants'
import { useBountyWithdrawns } from '@/bounty/hooks/useBountyWithdrawns'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'

interface Props {
  bounty: Bounty
}

export const BountyJudgement = React.memo(({ bounty }: Props) => {
  const [active, setActive] = useState<CommonTabsState>('Bounty')
  const entrants = useBountyEntrants(bounty)
  const withdrawns = useBountyWithdrawns(bounty)
  const periodsLengths = useMemo(
    () => ({
      fundingPeriodLength: getFundingPeriodLength(bounty.fundingType),
      judgingPeriodLength: bounty.judgingPeriod,
      workPeriodLength: bounty.workPeriod,
    }),
    [bounty]
  )

  return (
    <>
      <MainPanel>
        <CommonTiles bounty={bounty} period="judgement" />
        <CommonTabs active={active} setActive={setActive} />
        <ContentWithSidePanel>
          {active === 'Bounty' && <BountyTab bounty={bounty} />}
          {active === 'Works' && <WorkTab bountyId={bounty.id} />}
          <RowGapBlock gap={4}>
            <BountySidebar
              contributors={bounty.contributors}
              entrants={entrants}
              withdrawals={withdrawns}
              stage="judgement"
              periodsLengths={periodsLengths}
            />
          </RowGapBlock>
        </ContentWithSidePanel>
      </MainPanel>
      <BountyFooter bounty={bounty} />
    </>
  )
})
