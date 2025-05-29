import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

const useWarmUpBrowser = () => {
  return useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  });
};

export default useWarmUpBrowser;
