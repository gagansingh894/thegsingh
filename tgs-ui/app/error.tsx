"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="min-h-screen bg-tgs-bg flex items-center justify-center px-6">
      <div className="max-w-[420px] text-center">
        <div className="font-mono text-[11px] text-tgs-muted tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
          <span className="block w-3.5 h-px bg-tgs-muted" />
          Service unavailable
        </div>
        <h1 className="font-sans text-[32px] font-extrabold text-tgs-text leading-tight tracking-tight mb-4">
          Something went<br />wrong.
        </h1>
        <p className="font-mono text-[13px] text-tgs-body leading-[1.8] mb-8">
          The portfolio service is currently unreachable. This is likely a
          temporary issue — please try again in a moment.
        </p>
        {error.digest && (
          <p className="font-mono text-[10px] text-tgs-dim tracking-widest mb-6">
            ref: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="font-mono text-[12px] font-medium tracking-widest uppercase text-tgs-bg bg-tgs-text px-6 py-3 rounded-[4px] cursor-pointer transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
