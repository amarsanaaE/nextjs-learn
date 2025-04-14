interface Window {
  FB: {
    init: (options: {
      appId: string;
      autoLogAppEvents?: boolean;
      xfbml?: boolean;
      version: string;
    }) => void;
    XFBML: {
      parse: (dom?: Element) => void;
    };
  };
  fbAsyncInit: () => void;
}