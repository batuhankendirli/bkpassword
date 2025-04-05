import React, { ReactElement, cloneElement, forwardRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type ComponentWithTooltipProps = {
  children: ReactElement;
  tooltip: string;
  delayDuration?: number;
} & React.HTMLAttributes<HTMLElement>;

const ComponentWithTooltip = forwardRef<HTMLElement, ComponentWithTooltipProps>(
  ({ children, tooltip, delayDuration = 200, ...props }, ref) => {
    const childWithProps = cloneElement(children, {
      ...props,
      ref,
    });

    return (
      <TooltipProvider delayDuration={delayDuration}>
        <Tooltip>
          <TooltipTrigger asChild>{childWithProps}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

ComponentWithTooltip.displayName = 'ComponentWithTooltip';

export default ComponentWithTooltip;
