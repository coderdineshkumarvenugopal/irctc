import React, { ComponentType } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { JSX } from 'react';

export const PageLoader: React.FC = () => (
  <div className={"defaultLoader min-h-screen flex items-center justify-center flex-col gap-4 bg-surface-secondary w-full"}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    <p className="font-semibold text-md text-heading">Loading...</p>
  </div>
);



export function SuspenseWrapper<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>,
  DefaultLoader = PageLoader
) {
  return (props: P) => (
    <React.Suspense fallback={<DefaultLoader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  );
}

