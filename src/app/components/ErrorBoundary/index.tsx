import React, { ErrorInfo, ReactNode } from "react";
import { Result, Button } from "antd";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render the error state using Ant Design's Result component
      return (
        <Result
          status="error"
          className="h-screen w-screen"
          title="Oops! We have took the wrong Route let us Go Back 😅."
          subTitle={
            <div>
              {/* <p>
                We're sorry, but an error occurred while rendering this
                component.
              </p> */}
              <p>Error: {this.state.error && this.state.error.toString()}</p>
            </div>
          }
          extra={[
            <Button key="reload" type="primary" onClick={this.handleReload}>
              Reload Page
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
