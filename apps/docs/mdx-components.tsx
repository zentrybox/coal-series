import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  MetricCallout,
} from "@coal-series/react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentProps<"h1">) => <h1 className="text-display font-semibold" {...props} />,
    h2: (props: ComponentProps<"h2">) => <h2 className="mt-12 text-h1 font-semibold" {...props} />,
    h3: (props: ComponentProps<"h3">) => <h3 className="mt-8 text-h2 font-semibold" {...props} />,
    p: (props: ComponentProps<"p">) => (
      <p className="mt-4 text-body text-coal-text-secondary" {...props} />
    ),
    ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
    ol: (props: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-2 pl-6" {...props} />,
    code: (props: ComponentProps<"code">) => <code className="text-mono-sm" {...props} />,
    pre: (props: ComponentProps<"pre">) => (
      <pre
        className="mt-4 overflow-x-auto rounded-base border border-coal-border bg-coal-bg-alt p-5 text-mono text-coal-text-secondary"
        {...props}
      />
    ),
    table: (props: ComponentProps<"table">) => (
      <div className="mt-6 overflow-x-auto">
        <table
          className="min-w-full border-separate text-left text-body"
          cellPadding={0}
          cellSpacing={0}
          {...props}
        />
      </div>
    ),
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    MetricCallout,
    ...components,
  };
}
