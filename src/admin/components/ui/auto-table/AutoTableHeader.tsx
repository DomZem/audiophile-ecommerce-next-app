"use client";

import { cn } from "~/lib/utils";
import { useAutoTable } from "./AutoTableContext";
import { Button } from "../Button";
import { CirclePlus, CopyX, RotateCw } from "lucide-react";
import { useState } from "react";

export const AutoTableHeader = ({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <header
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export const AutoTableHeaderTitle = ({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

export const AutoTableCreateButton = () => {
  const { setCurrentAction } = useAutoTable();

  return (
    <Button
      type="button"
      size="icon"
      onClick={() => setCurrentAction("CREATE")}
    >
      <CirclePlus />
    </Button>
  );
};

export const AutoTableCloseDetailsButton = () => {
  const { currentAction, setCurrentAction } = useAutoTable();

  return (
    <Button
      type="button"
      size="icon"
      onClick={() => setCurrentAction(null)}
      variant="outline"
      className={
        currentAction === "DETAILS" ? "bg-accent text-accent-foreground" : ""
      }
    >
      <CopyX />
    </Button>
  );
};

export const AutoTableRefreshButton = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { handleRefetchData } = useAutoTable();

  return (
    <Button
      type="button"
      size="icon"
      disabled={isRefreshing}
      onClick={async () => {
        setIsRefreshing(true);
        await handleRefetchData();
        setIsRefreshing(false);
      }}
    >
      <RotateCw className={cn("", isRefreshing ? "animate-spin" : "")} />
    </Button>
  );
};
