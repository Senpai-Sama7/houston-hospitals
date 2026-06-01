import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen bg-[#030305] text-slate-200 flex items-center justify-center p-6">
            <div className="bg-[#0b0c14] border border-white/5 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                Something went wrong
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-6 leading-relaxed">
                {this.state.error?.message ?? "An unexpected error occurred."}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-mono font-bold tracking-wider hover:bg-amber-400 transition-colors"
              >
                RELOAD APPLICATION
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
