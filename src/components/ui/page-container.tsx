import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className="w-full space-y-6 p-6">{children}</div>;
}

export function PageHeader({ children }: Pick<PageContainerProps, "children">) {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
}

export function PageHeaderContent({ children }: { children: ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

export function PageDescription({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}

export function PageActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export function PageContent({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
