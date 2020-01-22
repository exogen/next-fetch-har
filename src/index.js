import React, { useCallback, useEffect, useState } from "react";

const dialogStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 0 0 0",
  fontFamily: "sans-serif",
  fontSize: 13,
  textAlign: "center",
  background: "#feb",
  color: "#000"
};

const messageStyle = {
  margin: 0,
  padding: "0 8px 8px 8px",
  fontSize: "1em",
  lineHeight: 18 / 13
};

const buttonGroupStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0 0 8px 0"
};

const buttonStyle = {
  display: "inline-block",
  verticalAlign: "top",
  margin: "0 3px",
  border: "1px solid black",
  borderRadius: 3,
  padding: "3px 10px",
  fontSize: 11,
  fontFamily: "inherit",
  fontStyle: "normal",
  lineHeight: 1,
  letterSpacing: 0,
  textDecoration: "none",
  background: "#111",
  color: "#fff"
};

function useHarUrl(har) {
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    if (har && typeof URL !== "undefined" && URL.createObjectURL) {
      const blob = new Blob([JSON.stringify(har)], {
        type: "data:application/json;charset=utf-8"
      });
      const objectUrl = URL.createObjectURL(blob);
      setDownloadUrl(objectUrl);
    }
  }, [har]);

  return downloadUrl;
}

export function ServerHttpArchive({ har }) {
  const hasHarEntries = har != null && har.log.entries.length > 0;
  const [hidden, setHidden] = useState(false);
  const downloadUrl = useHarUrl(har);

  const hide = useCallback(() => {
    setHidden(true);
  }, []);

  if (!hasHarEntries || !downloadUrl || hidden) {
    return null;
  }

  return (
    <div role="dialog" aria-label="Server HTTP Archive" style={dialogStyle}>
      <p style={messageStyle}>
        Server-side requests were recorded in an HTTP Archive.
      </p>
      <div role="group" style={buttonGroupStyle}>
        <a href={downloadUrl} download="next-fetch-ssr.har" style={buttonStyle}>
          Download
        </a>
        <button onClick={hide} style={buttonStyle}>
          Hide
        </button>
      </div>
    </div>
  );
}

export function withFetchHar(
  App,
  {
    fetch: baseFetch = global.fetch,
    enabled = process.env.NODE_ENV !== "production",
    ...options
  } = {}
) {
  const name = App.displayName || App.name || "App";

  class WithFetchHar extends React.Component {
    static displayName = `withFetchHar(${App})`;

    static async getInitialProps(appContext) {
      const isApp = !!appContext.Component;
      const ctx = isApp ? appContext.ctx : appContext;
      let har = null;
      const skip = typeof enabled === "function" ? !enabled(ctx) : !enabled;

      if (process.browser || skip) {
        ctx.fetch = fetch;
      } else {
        const { withHar, createHarLog } = require("node-fetch-har");
        har = createHarLog();
        ctx.fetch = withHar(fetch, { ...options, har });
      }

      const initialProps = await App.getInitialProps(appContext);

      return { ...initialProps, har };
    }

    render() {
      const { har, ...props } = this.props;
      return (
        <>
          <App {...props} />
          <ServerHttpArchive har={har} />
        </>
      );
    }
  }

  return WithFetchHar;
}
