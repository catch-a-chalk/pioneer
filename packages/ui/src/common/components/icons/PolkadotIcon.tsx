import React from 'react'

import { Icon } from './Icon'

export function PolkadotIcon() {
  return (
    <Icon size="40" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" fill="none" color="currentColor">
      <rect width="40" height="40" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_5441:177628" transform="scale(0.00666667)" />
        </pattern>
        <image
          id="image0_5441:177628"
          width="150"
          height="150"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </Icon>
  )
}